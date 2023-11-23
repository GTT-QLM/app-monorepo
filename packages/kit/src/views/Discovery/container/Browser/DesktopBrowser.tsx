import { memo, useEffect, useRef } from 'react';

import { Page } from '@onekeyhq/components';

import useAppNavigation from '../../../../hooks/useAppNavigation';
import { ETabRoutes } from '../../../../routes/Root/Tab/Routes';
import { DesktopOverlay } from '../../components/WebView/DesktopOverlay';
import { useActiveTabId, useWebTabs } from '../../hooks/useWebTabs';

import DesktopBrowserContent from './DesktopBrowserContent';
import DesktopBrowserNavigationContainer from './DesktopBrowserNavigationContainer';
import { withBrowserProvider } from './WithBrowserProvider';

function DesktopBrowser() {
  const { tabs } = useWebTabs();
  const { activeTabId } = useActiveTabId();

  const navigation = useAppNavigation();
  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current && tabs.length === 0) {
      navigation.switchTab(ETabRoutes.Discovery);
    }
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, [tabs, navigation]);

  return (
    <Page>
      <Page.Header headerTitle={DesktopBrowserNavigationContainer} />
      <Page.Body>
        {tabs.map((t) => (
          <DesktopBrowserContent
            key={t.id}
            id={t.id}
            activeTabId={activeTabId}
          />
        ))}
        <DesktopOverlay />
      </Page.Body>
    </Page>
  );
}

export default memo(withBrowserProvider(DesktopBrowser));
