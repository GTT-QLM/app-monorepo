import { useCallback } from 'react';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import {
  useSwapBuildTxFetchingAtom,
  useSwapBuildTxResultAtom,
  useSwapFromTokenAmountAtom,
  useSwapResultQuoteCurrentSelectAtom,
  useSwapSelectFromTokenAtom,
  useSwapSelectToTokenAtom,
  useSwapSlippagePercentageAtom,
} from '../../../states/jotai/contexts/swap';
import { mockAddress } from '../utils/utils';

import type { ESwapProviders } from '../types';

export function useSwapBuildTx() {
  const [fromToken] = useSwapSelectFromTokenAtom();
  const [toToken] = useSwapSelectToTokenAtom();
  const [fromTokenAmount] = useSwapFromTokenAmountAtom();
  const [slippagePercentage] = useSwapSlippagePercentageAtom();
  const [selectQuote] = useSwapResultQuoteCurrentSelectAtom();
  const [, setSwapBuildTxFetching] = useSwapBuildTxFetchingAtom();
  const [, setSwapBuildTxResult] = useSwapBuildTxResultAtom();

  const buildTx = useCallback(async () => {
    if (
      fromToken &&
      toToken &&
      fromTokenAmount &&
      slippagePercentage &&
      selectQuote
    ) {
      try {
        setSwapBuildTxFetching(true);
        const res = await backgroundApiProxy.serviceSwap.fetchBuildTx({
          fromToken,
          toToken,
          toTokenAmount: selectQuote.toAmount,
          fromTokenAmount,
          slippagePercentage: slippagePercentage.value.toFixed(),
          receivingAddress: mockAddress,
          userAddress: mockAddress,
          provider: selectQuote.info.provider as ESwapProviders,
        });
        setSwapBuildTxResult(res);
        console.log(res);
      } catch (e: any) {
        // TODO error handle
      } finally {
        setSwapBuildTxFetching(false);
      }
    }
  }, [
    fromToken,
    fromTokenAmount,
    selectQuote,
    setSwapBuildTxFetching,
    setSwapBuildTxResult,
    slippagePercentage,
    toToken,
  ]);

  return { buildTx };
}
