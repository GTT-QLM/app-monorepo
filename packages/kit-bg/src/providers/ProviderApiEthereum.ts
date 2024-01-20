import { web3Errors } from '@onekeyfe/cross-inpage-provider-errors';
import { IInjectedProviderNames } from '@onekeyfe/cross-inpage-provider-types';
import * as ethUtils from 'ethereumjs-util';

import type { IUnsignedMessage } from '@onekeyhq/core/src/types';
import {
  backgroundClass,
  providerApiMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';
import { EMessageTypesEth } from '@onekeyhq/shared/types/message';

import ProviderApiBase from './ProviderApiBase';

import type { IProviderBaseBackgroundNotifyInfo } from './ProviderApiBase';
import type {
  IJsBridgeMessagePayload,
  IJsonRpcRequest,
} from '@onekeyfe/cross-inpage-provider-types';

@backgroundClass()
class ProviderApiEthereum extends ProviderApiBase {
  public providerName = IInjectedProviderNames.ethereum;

  public override notifyDappAccountsChanged(
    info: IProviderBaseBackgroundNotifyInfo,
  ): void {
    const data = async ({ origin }: { origin: string }) => {
      const result = {
        method: 'metamask_accountsChanged',
        params: await this.eth_accounts({ origin, scope: this.providerName }),
      };
      return result;
    };
    info.send(data, info.targetOrigin);
  }

  public override notifyDappChainChanged(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async rpcCall(request: IJsonRpcRequest): Promise<any> {
    console.log(`${this.providerName} RpcCall=====>>>> : BgApi:`, request);
    return Promise.resolve();
  }

  @providerApiMethod()
  async eth_requestAccounts(request: IJsBridgeMessagePayload) {
    console.log('ProviderApiEthereum.eth_requestAccounts', request);
    await this.backgroundApi.serviceDApp.openConnectionModal(request);
    return this.eth_accounts(request);
  }

  @providerApiMethod()
  async eth_coinbase(request: IJsBridgeMessagePayload): Promise<string | null> {
    const accounts = await this.eth_accounts(request);
    return accounts?.[0] || null;
  }

  @providerApiMethod()
  async eth_accounts(request: IJsBridgeMessagePayload): Promise<string[]> {
    if (!request.origin) {
      throw new Error('origin is required');
    }
    const account = await this.backgroundApi.serviceDApp.getConnectedAccount(
      request.origin ?? '',
      request.scope ?? this.providerName,
    );
    if (!account) {
      return Promise.resolve([]);
    }
    console.log('====>Call eth_accounts: ', account);
    return Promise.resolve([account.address]);
  }

  @providerApiMethod()
  async eth_chainId(request: IJsBridgeMessagePayload) {
    console.log('=====>eth_chainId: ', request);
    if (!request.origin) {
      throw new Error('origin is required');
    }
    const network = await this.backgroundApi.serviceDApp.getConnectedNetwork(
      request.origin,
      request.scope ?? this.providerName,
    );
    if (network?.chainId) {
      return `0x${Number(network.chainId).toString(16)}`;
    }
    throw new Error('chainId not found');
  }

  @providerApiMethod()
  async net_version(request: IJsBridgeMessagePayload) {
    console.log('=====>net_version: ', request);
  }

  @providerApiMethod()
  eth_signTransaction() {
    throw web3Errors.provider.unsupportedMethod();
  }

  @providerApiMethod()
  eth_subscribe() {
    throw web3Errors.rpc.methodNotSupported();
  }

  @providerApiMethod()
  eth_unsubscribe() {
    throw web3Errors.rpc.methodNotSupported();
  }

  @providerApiMethod()
  eth_sign(request: IJsBridgeMessagePayload, ...messages: any[]) {
    return this._showSignMessageModal(request, {
      type: EMessageTypesEth.ETH_SIGN,
      message: messages[1],
      payload: messages,
    });
  }

  // Provider API
  @providerApiMethod()
  async personal_sign(request: IJsBridgeMessagePayload, ...messages: any[]) {
    let message = messages[0] as string;
    const address = messages[1] as string;

    message = this.autoFixPersonalSignMessage({ message });

    return this._showSignMessageModal(request, {
      type: EMessageTypesEth.PERSONAL_SIGN,
      message,
      payload: [message, address],
    });
  }

  autoFixPersonalSignMessage({ message }: { message: string }) {
    let messageFixed = message;
    try {
      ethUtils.toBuffer(message);
    } catch (error) {
      const tmpMsg = `0x${message}`;
      try {
        ethUtils.toBuffer(tmpMsg);
        messageFixed = tmpMsg;
      } catch (err) {
        // message not including valid hex character
      }
    }
    return messageFixed;
  }

  async _showSignMessageModal(
    request: IJsBridgeMessagePayload,
    unsignedMessage: IUnsignedMessage,
  ) {
    const result = await this.backgroundApi.serviceDApp.openSignMessageModal({
      request,
      unsignedMessage,
    });
    console.log('=====>>>>signmessage result: ', result);
    return result;
  }
}

export default ProviderApiEthereum;
