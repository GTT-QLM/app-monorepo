import { memo, useEffect, useMemo } from 'react';

import { Stack } from 'tamagui';

import type { IPageNavigationProp } from '@onekeyhq/components/src/Navigation';
import useAppNavigation from '@onekeyhq/kit/src/hooks/useAppNavigation';
import { EModalRoutes } from '@onekeyhq/kit/src/routes/Root/Modal/Routes';

import MobileBrowserInfoBar from '../../components/MobileBrowser/MobileBrowserInfoBar';
import { useTabDataFromSimpleDb } from '../../hooks/useTabDataFromSimpleDb';
import useWebTabAction from '../../hooks/useWebTabAction';
import {
  useActiveTabId,
  useWebTabData,
  useWebTabs,
} from '../../hooks/useWebTabs';
import { EDiscoveryModalRoutes } from '../../router/Routes';
import { gotoSite } from '../../utils/gotoSite';
import { checkAndCreateFolder } from '../../utils/screenshot';

import MobileBrowserContent from './MobileBrowserContent';
import { withBrowserProvider } from './WithBrowserProvider';

import type { IDiscoveryModalParamList } from '../../router/Routes';

function HandleRebuildTabBarData() {
  const result = useTabDataFromSimpleDb();
  const { setWebTabs, addBlankWebTab } = useWebTabAction();

  useEffect(() => {
    if (!result.result) return;
    const data = result.result;
    if (data && Array.isArray(data) && data.length > 0) {
      void setWebTabs({ data });
    } else {
      addBlankWebTab();
    }
  }, [result.result, addBlankWebTab, setWebTabs]);

  return null;
}

function MobileBrowser() {
  const { tabs } = useWebTabs();
  const { activeTabId } = useActiveTabId();
  const { tab } = useWebTabData(activeTabId ?? '');
  const navigation =
    useAppNavigation<IPageNavigationProp<IDiscoveryModalParamList>>();

  useEffect(() => {
    console.log('MobileBrowser renderer ===> : ');
    void checkAndCreateFolder();
  }, []);

  const content = useMemo(
    () => tabs.map((t) => <MobileBrowserContent id={t.id} key={t.id} />),
    [tabs],
  );

  return (
    <Stack flex={1} zIndex={3}>
      <HandleRebuildTabBarData />
      <MobileBrowserInfoBar
        id={activeTabId ?? ''}
        url={tab?.url ?? ''}
        onSearch={() => {
          navigation.pushModal(EModalRoutes.DiscoveryModal, {
            screen: EDiscoveryModalRoutes.SearchModal,
            params: {
              onSubmitContent: (text: string) => {
                console.log('onSubmitContent: ===> : ', text);
                gotoSite({
                  url: text,
                  isNewWindow: false,
                  userTriggered: true,
                });
              },
            },
          });
        }}
      />
      {content}
    </Stack>
  );
}

export default memo(withBrowserProvider(MobileBrowser));