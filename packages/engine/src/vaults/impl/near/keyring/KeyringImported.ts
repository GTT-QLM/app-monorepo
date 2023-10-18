import coreChainApi from '@onekeyhq/core/src/instance/coreChainApi';
import { COINTYPE_NEAR } from '@onekeyhq/shared/src/engine/engineConsts';

import { AccountType } from '../../../../types/account';
import { KeyringImportedBase } from '../../../keyring/KeyringImportedBase';

import type { ChainSigner } from '../../../../proxy';
import type { DBSimpleAccount } from '../../../../types/account';
import type {
  IGetPrivateKeysParams,
  IGetPrivateKeysResult,
  IPrepareImportedAccountsParams,
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '../../../types';

export class KeyringImported extends KeyringImportedBase {
  override coreApi = coreChainApi.near.imported;

  override getSigners(): Promise<Record<string, ChainSigner>> {
    throw new Error('getSigners moved to core.');
  }

  override async getPrivateKeys(
    params: IGetPrivateKeysParams,
  ): Promise<IGetPrivateKeysResult> {
    return this.baseGetPrivateKeys(params);
  }

  override async prepareAccounts(
    params: IPrepareImportedAccountsParams,
  ): Promise<Array<DBSimpleAccount>> {
    return this.basePrepareAccountsImported(params, {
      accountType: AccountType.SIMPLE,
      coinType: COINTYPE_NEAR,
    });
  }

  override async signTransaction(
    unsignedTx: IUnsignedTxPro,
    options: ISignCredentialOptions,
  ): Promise<ISignedTxPro> {
    return this.baseSignTransaction(unsignedTx, options);
  }

  override async signMessage(): Promise<string[]> {
    throw new Error('method not implemented');
  }
}
