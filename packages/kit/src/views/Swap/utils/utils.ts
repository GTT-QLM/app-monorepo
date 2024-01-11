import { SingleChainSwapProviders } from '../config/SwapProvider.constants';

import type { ESwapProviders, ISwapNetwork, ISwapToken } from '../types';

export function validateInput(text: string) {
  const regex = /^$|^0(\.\d{0,6})?$|^[1-9]\d*(\.\d{0,6})?$|^[1-9]\d*\.$|^0\.$/;
  if (!regex.test(text)) {
    return false;
  }
  return true;
}

export function shortContractAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function swapTokenPairsSupportedProviders(
  from: ISwapToken,
  to: ISwapToken,
): { providers: string } {
  const fromProvidersArr = from.providers.split(',');
  const toProvidersArr = to.providers.split(',');
  const providers = fromProvidersArr.filter((item) =>
    toProvidersArr.includes(item),
  );
  return {
    providers: providers.join(','),
  };
}

export function isOnlySupportSingleChainProvider(value: ISwapToken) {
  const providers = value.providers.split(',') as ESwapProviders[];
  return providers.every((item) => SingleChainSwapProviders.includes(item));
}

export function moveNetworkToFirst(arr: ISwapNetwork[], networkId: string) {
  const networks = [...arr];
  const index = networks.findIndex((item) => item.networkId === networkId);
  if (index !== -1) {
    const item = networks.splice(index, 1)[0];
    networks.splice(1, 0, item);
  }
  return networks;
}

export const mockAddress = '0x76f3f64cb3cD19debEE51436dF630a342B736C24';
export const mockNetworkId = 'evm--1';
