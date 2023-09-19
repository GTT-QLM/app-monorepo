import type { ICurveName } from '@onekeyhq/engine/src/secret';
import type { IUnsignedMessage } from '@onekeyhq/engine/src/types/message';
import type { IUnsignedTxPro } from '@onekeyhq/engine/src/vaults/types';
import type { AddressEncodings } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/types';

import type { SignatureOptions } from 'bitcoinjs-message';

// ----------------------------------------------

export type ICoreApiGetAddressesQueryHdBase = {
  template: string;
  hdCredential: ICoreHdCredential;
  password: string;
  indexes: number[];
};
export type ICoreApiGetAddressesQueryHdEvm = ICoreApiGetAddressesQueryHdBase;
export type ICoreApiGetAddressesQueryHdBtc = ICoreApiGetAddressesQueryHdBase & {
  networkChainCode: string;
  addressEncoding: AddressEncodings;
};
export type ICoreApiGetAddressesQueryHdCfx = ICoreApiGetAddressesQueryHdBase & {
  // TODO move to ICoreApiGetAddressesQueryHdBase
  chainId: string;
  networkId: string;
};
export type ICoreApiGetAddressesQueryHd =
  | ICoreApiGetAddressesQueryHdBase
  | ICoreApiGetAddressesQueryHdEvm
  | ICoreApiGetAddressesQueryHdBtc
  | ICoreApiGetAddressesQueryHdCfx;

export type ICoreApiGetAddressQueryImportedBase = {
  privateKeyRaw: string;
};
export type ICoreApiGetAddressQueryImportedBtc =
  ICoreApiGetAddressQueryImportedBase & {
    networkChainCode: string;
    template?: string; // TODO use addressEncoding?
  };
export type ICoreApiGetAddressQueryImported =
  | ICoreApiGetAddressQueryImportedBase
  | ICoreApiGetAddressQueryImportedBtc;
export type ICoreApiGetAddressQueryPublicKey = {
  publicKey: string;
  query?: ICoreApiGetAddressesQueryHd;
};
export type ICoreApiGetAddressItem = {
  address: string;
  publicKey: string;
  path?: string;
  xpub?: string;
  xpubSegwit?: string;
  addresses?: { [relPathOrNetworkId: string]: string };
};
export type ICoreApiGetAddressesResult = {
  addresses: ICoreApiGetAddressItem[];
};

// ----------------------------------------------
export type ICoreApiPrivateKeysMap = {
  // path type
  //   simple: full path
  //     utxo: base path
  // imported: ""
  [path: string]: string;
};
export type ICoreApiSignAccount = {
  address: string;
  path: string;
  pubKey?: string; // TODO rename to pub?
  template?: string;
  relPaths?: string[]; // used for get privateKey of other address
};
export type ICoreApiSignBasePayload = {
  networkChainCode?: string;
  password: string;
  account: ICoreApiSignAccount;
  credentials: ICoreCredentialsInfo;
  btcExtraInfo?: ICoreApiSignBtcExtraInfo;
};
export type ICoreApiSignBtcExtraInfo = {
  networkImpl: string;
  inputAddressesEncodings?: string[];
  nonWitnessPrevTxs?: { [txid: string]: string };
  pathToAddresses: {
    [path: string]: {
      address: string;
      relPath: string;
    };
  };
};
export type ICoreApiSignTxPayload = ICoreApiSignBasePayload & {
  unsignedTx: IUnsignedTxPro;
};
export type ICoreApiSignMsgPayload = ICoreApiSignBasePayload & {
  unsignedMsg: IUnsignedMessage;
};
export type ICoreApiGetPrivateKeysMapQuery = {
  account: {
    path: string;
    address: string;
  };
  password: string;
  seed: string;
  relPaths?: string[];
};
export type ICoreImportedCredential = {
  // encryptedPrivateKey
  privateKey: string;
};
export type ICoreHdCredential = {
  // encryptedSeed
  seed: string;
  entropy: string;
};
export type ICoreCredentialsInfo = {
  hd?: ICoreHdCredential;
  imported?: ICoreImportedCredential;
};