import { useCallback, useEffect, useMemo } from 'react';

import { Button, SizableText } from 'tamagui';

import { Input, XStack, YStack } from '@onekeyhq/components';

import { AccountSelectorActiveAccountHome } from '../../../components/AccountSelector';
import { DeriveTypeSelectorTrigger } from '../../../components/AccountSelector/DeriveTypeSelectorTrigger';
import {
  useAccountSelectorActions,
  useActiveAccount,
} from '../../../states/jotai/contexts/accountSelector';
import {
  useSwapProviderSupportReceiveAddressAtom,
  useSwapReceiverAddressInputValueAtom,
  useSwapReceiverAddressTypeAtom,
} from '../../../states/jotai/contexts/swap';
import SwapFromAmountPercentage from '../components/SwapFromAmountPercentage';
import SwapReceiverAddressTypeTrigger from '../components/SwapReceiverAddressTypeTrigger';
import SwapTokenBalance from '../components/SwapTokenBalance';
import { swapFromAmountPercentageItems } from '../config/SwapProvider.constants';
import { ESwapReceiveAddressType } from '../types';

import type { ISwapFromAmountPercentageItem, ISwapToken } from '../types';

interface ISwapAccountContainerProps {
  token?: ISwapToken;
  num: number;
  isReceiver?: boolean;
  onSelectAmountPercentage?: (item: ISwapFromAmountPercentageItem) => void;
}
const SwapAccountContainer = ({
  token,
  num,
  isReceiver,
  onSelectAmountPercentage,
}: ISwapAccountContainerProps) => {
  const { activeAccount } = useActiveAccount({ num });
  const { activeAccount: activeAccount0 } = useActiveAccount({ num: 0 });
  const [receiverAddressType, setReceiverAddressType] =
    useSwapReceiverAddressTypeAtom();

  const [receiverAddressInputValue, setReceiverAddressInputValue] =
    useSwapReceiverAddressInputValueAtom();

  const { updateSelectedAccount } = useAccountSelectorActions().current;

  const onSelectReceiverAddressType = useCallback(
    (type: ESwapReceiveAddressType) => {
      setReceiverAddressType(type);
    },
    [setReceiverAddressType],
  );

  const receiverAddressShowShowComponent = useMemo(() => {
    if (receiverAddressType === ESwapReceiveAddressType.INPUT) {
      return (
        <Input
          onChangeText={setReceiverAddressInputValue}
          value={receiverAddressInputValue}
        />
      );
    }
    if (receiverAddressType === ESwapReceiveAddressType.ADDRESS_BOOK) {
      return (
        <Button>
          <SizableText>open address book</SizableText>
        </Button>
      );
    }
    return null;
  }, [
    receiverAddressType,
    receiverAddressInputValue,
    setReceiverAddressInputValue,
  ]);
  const [isSupportReceiveAddressDifferent] =
    useSwapProviderSupportReceiveAddressAtom();

  useEffect(() => {
    if (isReceiver && !isSupportReceiveAddressDifferent) {
      setReceiverAddressType(ESwapReceiveAddressType.USER_ACCOUNT);
      updateSelectedAccount({
        num,
        builder: (v) => ({
          ...v,
          networkId: activeAccount0.network?.id,
          walletId: activeAccount0.wallet?.id,
          indexedAccountId: activeAccount0.indexedAccount?.id,
        }),
      });
    }
  }, [
    activeAccount0,
    isReceiver,
    isSupportReceiveAddressDifferent,
    num,
    setReceiverAddressType,
    updateSelectedAccount,
  ]);

  if (!token || !activeAccount) {
    return null;
  }
  return (
    <XStack justifyContent="space-between">
      <YStack>
        {!isReceiver ||
        receiverAddressType === ESwapReceiveAddressType.USER_ACCOUNT ? (
          <XStack>
            <AccountSelectorActiveAccountHome num={num} />
            <DeriveTypeSelectorTrigger miniMode num={num} />
          </XStack>
        ) : (
          receiverAddressShowShowComponent
        )}
        <SwapTokenBalance
          balance={token?.balanceParsed ? Number(token.balanceParsed) : 0.0}
          symbol={token?.symbol ?? ''}
        />
      </YStack>

      {!isReceiver && onSelectAmountPercentage ? (
        <SwapFromAmountPercentage
          selectItems={swapFromAmountPercentageItems}
          onSelectItem={onSelectAmountPercentage}
        />
      ) : (
        <SwapReceiverAddressTypeTrigger
          onSelectType={onSelectReceiverAddressType}
        />
      )}
    </XStack>
  );
};

export default SwapAccountContainer;
