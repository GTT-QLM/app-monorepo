import { Core } from '@walletconnect/core';
import { getSdkError } from '@walletconnect/utils';
import { Web3Wallet } from '@walletconnect/web3wallet';

import { EModalRoutes } from '@onekeyhq/kit/src/routes/Modal/type';
// import { EWalletConnectPages } from '@onekeyhq/kit/src/views/WalletConnect/router';
import { backgroundMethod } from '@onekeyhq/shared/src/background/backgroundDecorators';
import { IMPL_EVM } from '@onekeyhq/shared/src/engine/engineConsts';
import { getNotSupportedChains } from '@onekeyhq/shared/src/walletConnect/chainsData';
import {
  WALLET_CONNECT_CLIENT_META,
  WALLET_CONNECT_V2_PROJECT_ID,
} from '@onekeyhq/shared/src/walletConnect/constant';

import { WalletConnectRequestProxyEth } from './WalletConnectRequestProxyEth';

import type {
  IWalletConnectRequestOptions,
  WalletConnectRequestProxy,
} from './WalletConnectRequestProxy';
import type { IBackgroundApi } from '../../apis/IBackgroundApi';
import type { IWeb3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet';

class ProviderApiWalletConnect {
  constructor({ backgroundApi }: { backgroundApi: any }) {
    this.backgroundApi = backgroundApi;
  }

  backgroundApi: IBackgroundApi;

  web3Wallet?: IWeb3Wallet;

  requestProxyMap: {
    [networkImpl: string]: WalletConnectRequestProxy;
  } = {
    [IMPL_EVM]: new WalletConnectRequestProxyEth({
      client: this,
    }),
  };

  getRequestProxy({ networkImpl }: { networkImpl: string }) {
    return this.requestProxyMap[networkImpl];
  }

  @backgroundMethod()
  async initialize() {
    if (this.web3Wallet) {
      return;
    }
    const core = new Core({
      projectId: WALLET_CONNECT_V2_PROJECT_ID,
    });
    this.web3Wallet = await Web3Wallet.init({
      core,
      metadata: WALLET_CONNECT_CLIENT_META,
    });
    this.registerEvents();
  }

  registerEvents() {
    if (!this.web3Wallet) {
      throw new Error('web3Wallet is not initialized');
    }
    this.web3Wallet.on('session_proposal', this.onSessionProposal.bind(this));
    this.web3Wallet.on('session_request', this.onSessionRequest.bind(this));
    this.web3Wallet.on('session_delete', this.onSessionDelete.bind(this));
    this.web3Wallet.engine.signClient.events.on(
      'session_ping',
      this.onSessionPing.bind(this),
    );
    this.web3Wallet.on('auth_request', this.onAuthRequest.bind(this));
  }

  unregisterEvents() {
    if (!this.web3Wallet) {
      throw new Error('web3Wallet is not initialized');
    }
    this.web3Wallet.off('session_proposal', this.onSessionProposal.bind(this));
    this.web3Wallet.off('session_request', this.onSessionRequest.bind(this));
    this.web3Wallet.off('session_delete', this.onSessionDelete.bind(this));
    this.web3Wallet.engine.signClient.events.off(
      'session_ping',
      this.onSessionPing.bind(this),
    );
    this.web3Wallet.off('auth_request', this.onAuthRequest.bind(this));
  }

  async onSessionProposal(proposal: Web3WalletTypes.SessionProposal) {
    console.log('onSessionProposal: ', proposal);
    // check if all required networks are supported
    const notSupportedChains = getNotSupportedChains(proposal);
    if (notSupportedChains.length > 0) {
      await this.web3Wallet?.rejectSession({
        id: proposal.id,
        reason: getSdkError('UNSUPPORTED_CHAINS'),
      });
      return;
    }

    try {
      const result = await this.backgroundApi.serviceDApp.openModal({
        request: {},
        // screens: ['WalletConnectModal', 'SessionProposalModal'],
        screens: [
          EModalRoutes.WalletConnectModal,
          // EWalletConnectPages.SessionProposalModal,
          'SessionProposalModal',
        ],
        params: {
          proposal,
        },
      });
      console.log('=====>>>>result: ', result);
      await this.web3Wallet?.approveSession({
        id: proposal.id,
        namespaces: result as any,
      });
    } catch {
      await this.web3Wallet?.rejectSession({
        id: proposal.id,
        reason: getSdkError('USER_REJECTED'),
      });
    }
  }

  async onSessionRequest(request: Web3WalletTypes.SessionRequest) {
    console.log('onSessionRequest: ', request);
    const { topic, id } = request;
    try {
      const requestProxy = this.getRequestProxy({ networkImpl: IMPL_EVM });
      const ret = await requestProxy.request(
        { sessionRequest: request },
        request.params.request,
      );
      console.log('====>onSessionRequest ret: ', ret);

      await this.web3Wallet?.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: '2.0',
          result: ret,
        },
      });
    } catch (error: any) {
      await this.web3Wallet?.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: '2.0',
          error: getSdkError('USER_REJECTED', (error as Error)?.message),
        },
      });
    }
  }

  onSessionDelete(args: Web3WalletTypes.SessionDelete) {
    console.log('onSessionDelete: ', args);
  }

  onAuthRequest(args: Web3WalletTypes.AuthRequest) {
    console.log('onAuthRequest: ', args);
  }

  onSessionPing() {
    console.log('ping');
  }

  @backgroundMethod()
  async connect(uri: string) {
    if (!this.web3Wallet) {
      await this.initialize();
    }
    await this.web3Wallet?.pair({ uri });
  }

  getDAppOrigin(option: IWalletConnectRequestOptions) {
    return option.sessionRequest?.verifyContext.verified.origin ?? '';
  }
}

export default ProviderApiWalletConnect;
