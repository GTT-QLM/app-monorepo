import { Psbt } from 'bitcoinjs-lib';
import bs58check from 'bs58check';

import type { ICoreUnsignedMessageBtc } from '@onekeyhq/core/src/types';
import { ICoreUnsignedMessage } from '@onekeyhq/core/src/types';
import { batchGetPublicKeys } from '@onekeyhq/engine/src/secret';
import { wait } from '@onekeyhq/kit/src/utils/helper';
import {
  COINTYPE_BCH,
  COINTYPE_DOGE,
  IMPL_TBTC,
} from '@onekeyhq/shared/src/engine/engineConsts';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';
import { toPsbtNetwork } from '@onekeyhq/shared/src/providerApis/ProviderApiBtc/ProviderApiBtc.utils';
import { checkIsDefined } from '@onekeyhq/shared/src/utils/assertUtils';

import { slicePathTemplate } from '../../../managers/derivation';
import { getAccountNameInfoByTemplate } from '../../../managers/impl';
import { ChainSigner } from '../../../proxy';
import { AccountType } from '../../../types/account';
import { BtcMessageTypes } from '../../../types/message';
import { KeyringHdBase } from '../../keyring/KeyringHdBase';

import { getAccountDefaultByPurpose, initBitcoinEcc } from './utils';
import btcForkSignUtils from './utils/btcForkSignUtils';

import type { ExportedSeedCredential } from '../../../dbs/base';
import type { DBUTXOAccount } from '../../../types/account';
import type { IUnsignedMessageBtc } from '../../impl/btc/types';
import type {
  IPrepareAccountByAddressIndexParams,
  IPrepareSoftwareAccountsParams,
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '../../types';
import type { AddressEncodings } from './types';
import type VaultBtcFork from './VaultBtcFork';

export class KeyringHdBtcFork extends KeyringHdBase {
  override async signTransaction(
    unsignedTx: IUnsignedTxPro,
    options: ISignCredentialOptions,
  ): Promise<ISignedTxPro> {
    initBitcoinEcc();
    const { password } = options;
    const { psbtHex, inputsToSign } = unsignedTx;
    if (typeof password === 'undefined') {
      throw new OneKeyInternalError('Software signing requires a password.');
    }

    const signers = await this.getSigners(
      password,
      (inputsToSign || unsignedTx.inputs).map((input) => input.address),
    );
    debugLogger.engine.info('signTransaction', this.networkId, unsignedTx);

    const provider = await (
      this.vault as unknown as VaultBtcFork
    ).getProvider();

    if (psbtHex && inputsToSign) {
      const { network } = provider;
      const psbt = Psbt.fromHex(psbtHex, { network });

      return provider.signPsbt({
        psbt,
        signers,
        inputsToSign,
      });
    }

    return provider.signTransaction(unsignedTx, signers);
  }

  override async getSigners(
    password: string,
    addresses: Array<string>,
  ): Promise<Record<string, ChainSigner>> {
    const relPathToAddresses: Record<string, string> = {};
    const { utxos } = await (
      this.vault as unknown as VaultBtcFork
    ).collectUTXOsInfo({ checkInscription: false });
    for (const utxo of utxos) {
      const { address, path } = utxo;
      if (addresses.includes(address)) {
        relPathToAddresses[path] = address;
      }
    }

    const relPaths = Object.keys(relPathToAddresses).map((fullPath) =>
      fullPath.split('/').slice(-2).join('/'),
    );
    if (relPaths.length === 0) {
      throw new OneKeyInternalError('No signers would be chosen.');
    }
    const privateKeys = await this.getPrivateKeys({ password, relPaths });
    const ret: Record<string, ChainSigner> = {};
    for (const [path, privateKey] of Object.entries(privateKeys)) {
      let address = relPathToAddresses[path];

      // fix blockbook utxo path to match local account path
      if ((await this.getNetworkImpl()) === IMPL_TBTC) {
        if (!address) {
          const fixedPath = path.replace(`m/86'/0'/`, `m/86'/1'/`);
          address = relPathToAddresses[fixedPath];
        }
        if (!address) {
          const fixedPath = path.replace(`m/86'/1'/`, `m/86'/0'/`);
          address = relPathToAddresses[fixedPath];
        }
      }

      const signer = new ChainSigner(privateKey, password, 'secp256k1');

      // TODO generate address from privateKey, and check if matched with utxo address
      const addressFromPrivateKey = address;
      if (addressFromPrivateKey !== address) {
        throw new Error('addressFromPrivateKey and utxoAddress not matched');
      }
      ret[address] = signer;
    }
    return ret;
  }

  override async prepareAccounts(
    params: IPrepareSoftwareAccountsParams,
  ): Promise<DBUTXOAccount[]> {
    const {
      password,
      indexes,
      purpose,
      names,
      template,
      skipCheckAccountExist,
    } = params;
    initBitcoinEcc();
    const provider = await (
      this.vault as unknown as VaultBtcFork
    ).getProvider();

    const ret = await this.createAccount({
      password,
      indexes,
      purpose,
      names,
      template,
      addressIndex: 0,
      isChange: false,
      isCustomAddress: false,
      validator: skipCheckAccountExist
        ? undefined
        : async ({ xpub, addressEncoding }) => {
            const { txs } = (await provider.getAccount(
              { type: 'simple', xpub },
              addressEncoding,
            )) as { txs: number };
            return txs > 0;
          },
    });
    return ret;
  }

  private async createAccount({
    password,
    indexes,
    purpose,
    names,
    template,
    addressIndex,
    isChange,
    isCustomAddress,
    validator,
  }: {
    password: string;
    indexes: number[];
    purpose?: number;
    names?: string[];
    template: string;
    addressIndex: number;
    isChange: boolean;
    isCustomAddress: boolean;
    validator?: ({
      xpub,
      address,
      addressEncoding,
    }: {
      xpub: string;
      address: string;
      addressEncoding: AddressEncodings;
    }) => Promise<boolean>;
  }) {
    const impl = await this.getNetworkImpl();
    const vault = this.vault as unknown as VaultBtcFork;
    const defaultPurpose = vault.getDefaultPurpose();
    const coinName = vault.getCoinName();
    const COIN_TYPE = vault.getCoinType();

    const usedPurpose = purpose || defaultPurpose;
    const ignoreFirst = indexes[0] !== 0;
    const usedIndexes = [...(ignoreFirst ? [indexes[0] - 1] : []), ...indexes];
    const { addressEncoding } = getAccountDefaultByPurpose(
      usedPurpose,
      coinName,
    );
    const { prefix: namePrefix } = getAccountNameInfoByTemplate(impl, template);
    const { seed } = (await this.engine.dbApi.getCredential(
      this.walletId,
      password,
    )) as ExportedSeedCredential;
    const provider = await (
      this.vault as unknown as VaultBtcFork
    ).getProvider();
    const { network } = provider;
    const { pathPrefix } = slicePathTemplate(template);
    const pubkeyInfos = batchGetPublicKeys(
      'secp256k1',
      seed,
      password,
      pathPrefix,
      usedIndexes.map((index) => `${index.toString()}'`),
    );
    if (pubkeyInfos.length !== usedIndexes.length) {
      throw new OneKeyInternalError('Unable to get publick key.');
    }

    const { public: xpubVersionBytes } =
      (network.segwitVersionBytes || {})[addressEncoding] || network.bip32;

    const ret = [];
    let index = 0;
    for (const { path, parentFingerPrint, extendedKey } of pubkeyInfos) {
      const xpub = bs58check.encode(
        Buffer.concat([
          Buffer.from(xpubVersionBytes.toString(16).padStart(8, '0'), 'hex'),
          Buffer.from([3]),
          parentFingerPrint,
          Buffer.from(
            (usedIndexes[index] + 2 ** 31).toString(16).padStart(8, '0'),
            'hex',
          ),
          extendedKey.chainCode,
          extendedKey.key,
        ]),
      );
      const addressRelPath = `${isChange ? '1' : '0'}/${addressIndex}`;
      const { [addressRelPath]: address } = provider.xpubToAddresses(
        xpub,
        [addressRelPath],
        addressEncoding,
      );
      const customAddresses = isCustomAddress
        ? { [addressRelPath]: address }
        : undefined;
      const prefix = [COINTYPE_DOGE, COINTYPE_BCH].includes(COIN_TYPE)
        ? coinName
        : namePrefix;
      const name =
        (names || [])[index] || `${prefix} #${usedIndexes[index] + 1}`;
      if (!ignoreFirst || index > 0) {
        ret.push({
          id: `${this.walletId}--${path}`,
          name,
          type: AccountType.UTXO,
          path,
          coinType: COIN_TYPE,
          xpub,
          address,
          addresses: { [addressRelPath]: address },
          customAddresses,
          template,
        });
      }

      if (usedIndexes.length === 1) {
        // Only getting the first account, ignore balance checking.
        break;
      }

      if (validator) {
        if (await validator?.({ xpub, address, addressEncoding })) {
          index += 1;
          await new Promise((r) => setTimeout(r, 200));
        } else {
          // Software should prevent a creation of an account
          // if a previous account does not have a transaction history (meaning none of its addresses have been used before).
          // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
          break;
        }
      } else {
        index += 1;
      }
    }
    return ret;
  }

  override async prepareAccountByAddressIndex(
    params: IPrepareAccountByAddressIndexParams,
  ): Promise<DBUTXOAccount[]> {
    const { password, template, accountIndex, addressIndex } = params;
    const purpose = parseInt(template.split('/')?.[1], 10);
    const ret = await this.createAccount({
      password,
      indexes: [accountIndex],
      purpose,
      template,
      addressIndex,
      isChange: false,
      isCustomAddress: true,
    });
    return ret;
  }

  async basePrepareAccountsHdBtc(
    params: IPrepareSoftwareAccountsParams,
  ): Promise<DBUTXOAccount[]> {
    const {
      password,
      indexes,
      purpose,
      names,
      template,
      skipCheckAccountExist,
    } = params;
    initBitcoinEcc();
    const impl = await this.getNetworkImpl();
    const vault = this.vault as unknown as VaultBtcFork;
    const defaultPurpose = vault.getDefaultPurpose();
    const coinName = vault.getCoinName();
    const COIN_TYPE = vault.getCoinType();

    const ignoreFirst = indexes[0] !== 0;
    // check first prev non-zero index account existing
    const usedIndexes = [...(ignoreFirst ? [indexes[0] - 1] : []), ...indexes];
    const usedPurpose = purpose || defaultPurpose;
    const { addressEncoding } = getAccountDefaultByPurpose(
      usedPurpose,
      coinName,
    );

    const chainCode = (await this.getChainInfo()).code;
    const credentials = await this.baseGetCredentialsInfo({ password });
    const { addresses: addressesInfo } = await checkIsDefined(
      this.coreApi,
    ).getAddressesFromHd({
      template,
      hdCredential: checkIsDefined(credentials.hd),
      password,
      indexes: usedIndexes,
      networkChainCode: chainCode,
      addressEncoding,
    });

    const { prefix: namePrefix } = getAccountNameInfoByTemplate(impl, template);

    const provider = await (
      this.vault as unknown as VaultBtcFork
    ).getProvider();

    const ret: DBUTXOAccount[] = [];
    let index = 0;
    for (const {
      path,
      publicKey,
      xpub,
      xpubSegwit,
      address,
      addresses,
    } of addressesInfo) {
      if (!path || !xpub || !addresses) {
        throw new Error('path or xpub or addresses is undefined');
      }

      const prefix = [COINTYPE_DOGE, COINTYPE_BCH].includes(COIN_TYPE)
        ? coinName
        : namePrefix;
      const name = names?.[index] || `${prefix} #${usedIndexes[index] + 1}`;
      const id = `${this.walletId}--${path}`;
      if (!ignoreFirst || index > 0) {
        ret.push({
          id,
          name,
          type: AccountType.UTXO,
          path,
          coinType: COIN_TYPE,
          pubKey: publicKey,
          xpub,
          xpubSegwit,
          address,
          addresses,
          template,
        });
      }

      const isLast = index === addressesInfo.length - 1;
      if (!skipCheckAccountExist && !isLast) {
        const xpubFinal = xpubSegwit || xpub;
        const { txs } = (await provider.getAccount(
          { type: 'simple', xpub: xpubFinal },
          addressEncoding,
        )) as { txs: number };
        if (txs <= 0) {
          // Software should prevent a creation of an account
          // if a previous account does not have a transaction history (meaning none of its addresses have been used before).
          // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
          break;
        }
        // blockbook API rate limit.
        await wait(200);
      }

      index += 1;
    }
    return ret;
  }
}
