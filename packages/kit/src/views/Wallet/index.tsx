import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useIntl } from 'react-intl';

import type { ForwardRefHandle } from '@onekeyhq/app/src/views/NestedTabView/NestedTabView';
import {
  Box,
  ScrollView,
  useIsVerticalLayout,
  useUserDevice,
} from '@onekeyhq/components';
import { Tabs } from '@onekeyhq/components/src/CollapsibleTabView';
import { isAllNetworks } from '@onekeyhq/engine/src/managers/network';
import { useActiveWalletAccount } from '@onekeyhq/kit/src/hooks';
import { MAX_PAGE_CONTAINER_WIDTH } from '@onekeyhq/shared/src/config/appConfig';
import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import backgroundApiProxy from '../../background/instance/backgroundApiProxy';
import IdentityAssertion from '../../components/IdentityAssertion';
import { OneKeyPerfTraceLog } from '../../components/OneKeyPerfTraceLog';
import { useHomeTabName } from '../../hooks/useHomeTabName';
import { useHtmlPreloadSplashLogoRemove } from '../../hooks/useHtmlPreloadSplashLogoRemove';
import { useOnboardingRequired } from '../../hooks/useOnboardingRequired';
import { useWalletTabsWithAuth } from '../../hooks/useProtectedVerify';
import { setHomeTabName } from '../../store/reducers/status';
import { OverviewDefiList } from '../Overview/OverviewDefiList';
import { GuideToPushFirstTimeCheck } from '../PushNotification/GuideToPushFirstTime';
import { TxHistoryListView } from '../TxHistory/TxHistoryListView';

import AccountInfo, {
  FIXED_HORIZONTAL_HEDER_HEIGHT,
  FIXED_VERTICAL_HEADER_HEIGHT,
} from './AccountInfo';
import { HomeTokenAssetsList } from './AssetsList';
import { BottomView } from './BottomView';
import { HomeTabIndexSync } from './HomeTabIndexSync';
import NFTList from './NFT/NFTList';
import ToolsPage from './Tools';
import { WalletHomeTabEnum } from './type';

function AccountHeader() {
  const isVerticalLayout = useIsVerticalLayout();
  const headerHeight =
    (isVerticalLayout
      ? FIXED_VERTICAL_HEADER_HEIGHT
      : FIXED_HORIZONTAL_HEDER_HEIGHT) || 'auto';
  return (
    <Box h={headerHeight}>
      <AccountInfo />
    </Box>
  );
}

// HomeTabs
const WalletTabs: FC = () => {
  const intl = useIntl();
  const ref = useRef<ForwardRefHandle>(null);
  const currentIndexRef = useRef<number>(0);
  const { screenWidth } = useUserDevice();
  const isVerticalLayout = useIsVerticalLayout();
  const homeTabName = useHomeTabName();
  const { wallet, network, accountId, networkId, walletId } =
    useActiveWalletAccount();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const walletTabsWithAuth = useWalletTabsWithAuth();
  useEffect(() => {
    if (network?.settings.validationRequired) {
      walletTabsWithAuth({
        walletId,
        accountId,
        networkId,
        networkName: network.name,
      });
    }
  }, [accountId, network, networkId, walletId, walletTabsWithAuth]);
  // LazyRenderCurrentHomeTab
  const tokensTab = useMemo(
    () => (
      <Tabs.Tab
        name={WalletHomeTabEnum.Tokens}
        label={intl.formatMessage({ id: 'asset__tokens' })}
        key={WalletHomeTabEnum.Tokens}
      >
        <ScrollView>
          <OneKeyPerfTraceLog name="App RootTabHome AssetsList render" />
          <GuideToPushFirstTimeCheck />
          <HomeTokenAssetsList
            walletId={walletId}
            accountId={accountId}
            networkId={networkId}
            limitSize={10}
          />
          <Box h={6} />
          <OverviewDefiList
            accountId={accountId}
            networkId={networkId}
            limitSize={10}
          />
        </ScrollView>
      </Tabs.Tab>
    ),
    [accountId, intl, networkId, walletId],
  );

  const nftTab = useMemo(
    () => (
      <Tabs.Tab
        name={WalletHomeTabEnum.Collectibles}
        label={intl.formatMessage({ id: 'asset__collectibles' })}
        key={WalletHomeTabEnum.Collectibles}
      >
        <NFTList />
      </Tabs.Tab>
    ),
    [intl],
  );

  const historyTab = useMemo(
    () => (
      <Tabs.Tab
        name={WalletHomeTabEnum.History}
        label={intl.formatMessage({ id: 'transaction__history' })}
        key={WalletHomeTabEnum.History}
      >
        <TxHistoryListView
          accountId={accountId}
          networkId={networkId}
          isHomeTab
        />
      </Tabs.Tab>
    ),
    [accountId, networkId, intl],
  );

  const toolsTab = useMemo(
    () => (
      <Tabs.Tab
        name={WalletHomeTabEnum.Tools}
        label={intl.formatMessage({ id: 'form__tools' })}
        key={WalletHomeTabEnum.Tools}
      >
        <ToolsPage />
      </Tabs.Tab>
    ),
    [intl],
  );

  const usedTabs = useMemo(() => {
    const defaultTabs = [
      {
        name: WalletHomeTabEnum.Tokens,
        tab: tokensTab,
      },
      {
        name: WalletHomeTabEnum.Collectibles,
        tab: nftTab,
      },
      {
        name: WalletHomeTabEnum.History,
        tab: historyTab,
      },
      {
        name: WalletHomeTabEnum.Tools,
        tab: toolsTab,
      },
    ];
    return defaultTabs.filter((t) => {
      if (t.name === WalletHomeTabEnum.Collectibles) {
        return !network?.settings.hiddenNFTTab;
      }
      if (t.name === WalletHomeTabEnum.History) {
        return !isAllNetworks(networkId);
      }
      if (t.name === WalletHomeTabEnum.Tools) {
        return !network?.settings?.hiddenToolTab;
      }
      return true;
    });
  }, [network?.settings, networkId, tokensTab, nftTab, historyTab, toolsTab]);

  const onRefresh = useCallback(() => {
    ref?.current?.setRefreshing(true);
    backgroundApiProxy.serviceOverview.refreshCurrentAccount().finally(() => {
      setTimeout(() => ref?.current?.setRefreshing(false), 50);
    });
  }, []);

  const tabContents = useMemo(
    () => usedTabs.map((t) => t.tab).filter(Boolean),
    [usedTabs],
  );

  const getHomeTabNameByIndex = useCallback(
    (index: number) => usedTabs[index]?.name,
    [usedTabs],
  );

  const onIndexChange = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      if (timer.current) clearTimeout(timer.current);

      // Android animation redux causes ui stuttering
      timer.current = setTimeout(() => {
        debugLogger.common.info('setHomeTabIndex', index);
        backgroundApiProxy.dispatch(
          setHomeTabName(getHomeTabNameByIndex(index)),
        );
      });
    },
    [getHomeTabNameByIndex],
  );

  const onPageScrollStateChangeCall = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const containerStyle = useMemo(
    () => ({
      maxWidth: MAX_PAGE_CONTAINER_WIDTH,
      // reduce the width on iPad, sidebar's width is 244
      width: isVerticalLayout ? screenWidth : screenWidth - 224,
      marginHorizontal: 'auto', // Center align vertically
      alignSelf: 'center' as any,
      flex: 1,
    }),
    [isVerticalLayout, screenWidth],
  );

  const accountHeaderMemo = useMemo(() => <AccountHeader />, []);

  if (!wallet) return null;
  const contentView = (
    <>
      <Tabs.Container
        // IMPORTANT: key is used to force re-render when the tab is changed
        // otherwise android app will crash when tabs are changed
        key={platformEnv.isNativeAndroid ? `${tabContents.length}` : undefined}
        canOpenDrawer
        stickyTabBar
        initialTabName={homeTabName}
        onRefresh={onRefresh}
        onIndexChange={onIndexChange}
        onPageScrollStateChange={onPageScrollStateChangeCall}
        headerView={accountHeaderMemo}
        ref={ref}
        containerStyle={containerStyle}
      >
        {tabContents}
      </Tabs.Container>
      <HomeTabIndexSync
        tabsContainerRef={ref}
        currentIndexRef={currentIndexRef}
        homeTabName={homeTabName}
        usedTabs={usedTabs}
      />
    </>
  );

  return contentView;
};
const WalletTabsMemo = memo(WalletTabs);

function WalletPreCheck() {
  useOnboardingRequired(true);
  useHtmlPreloadSplashLogoRemove();
  return null;
}

const WalletPreCheckMemo = memo(WalletPreCheck);

const Wallet = () => (
  <>
    <WalletPreCheckMemo />
    <Box flex={1}>
      <IdentityAssertion>
        <WalletTabsMemo />
      </IdentityAssertion>
    </Box>
    <BottomView />
  </>
);
Wallet.displayName = 'HomeTabWallet';

export default Wallet;
