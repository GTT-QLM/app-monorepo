import { useMemo, useState } from 'react';

import {
  ActionList,
  IconButton,
  Image,
  Stack,
  Text,
  XStack,
  YStack,
} from '@onekeyhq/components';

import { TAB_LIST_CELL_WIDTH } from '../../config/TabList.constants';
import { useWebTabData } from '../../hooks/useWebTabs';

import type { IWebTab } from '../../types';

function MobileTabListPinnedItem({
  id,
  activeTabId,
  onSelectedItem,
  onLongPress,
}: {
  activeTabId: string | null;
  onSelectedItem: (id: string) => void;
  onCloseItem: (id: string) => void;
  onLongPress: (id: string) => void;
} & IWebTab) {
  const { tab } = useWebTabData(id);
  const isActive = useMemo(() => activeTabId === id, [id, activeTabId]);
  return (
    <Stack
      w={TAB_LIST_CELL_WIDTH}
      h="$10"
      mr="$4"
      mb="$4"
      onPress={() => {
        onSelectedItem(id);
      }}
      onLongPress={() => {
        onLongPress(id);
      }}
      borderRadius="$3"
      borderWidth={1}
      borderColor={isActive ? '$borderActive' : '$borderCritical'}
      bg="$background-default"
      overflow="hidden"
    >
      <XStack justifyContent="center" alignItems="center" h="$8">
        {/* <Image w="$4" h="$4" source={{ uri: tab?.favicon }} /> */}
        <Text px="$2" flex={1} color="$text" textAlign="left" numberOfLines={1}>
          {tab?.title || ''}
        </Text>
      </XStack>
    </Stack>
  );
}

export default MobileTabListPinnedItem;