import type { IModalFlowNavigatorConfig } from '@onekeyhq/components';

import SwapBuildTxDemo from '../../views/Swap/container/modal/SwapBuildTxDemo';
import SwapHistoryDetailModal from '../../views/Swap/container/modal/SwapHistoryDetailModal';
import SwapHistoryListModal from '../../views/Swap/container/modal/SwapHistoryListModal';
import SwapNetworkSelectModal from '../../views/Swap/container/modal/SwapNetworkSelectModal';
import SwapProviderSelectModal from '../../views/Swap/container/modal/SwapProviderSelectModal';
import SwapSlippageSelectModal from '../../views/Swap/container/modal/SwapSlippageSelectModal';
import SwapTokenSelectModal from '../../views/Swap/container/modal/SwapTokenSelectModal';
import { EModalSwapRoutes } from '../../views/Swap/router/Routers';

import type { IModalSwapParamList } from '../../views/Swap/router/Routers';

export const ModalSwapStack: IModalFlowNavigatorConfig<
  EModalSwapRoutes,
  IModalSwapParamList
>[] = [
  {
    name: EModalSwapRoutes.SwapTokenSelect,
    component: SwapTokenSelectModal,
    translationId: 'title__select_a_token',
  },
  {
    name: EModalSwapRoutes.SwapNetworkSelect,
    component: SwapNetworkSelectModal,
    translationId: 'title__select_networks',
  },
  {
    name: EModalSwapRoutes.SwapProviderSelect,
    component: SwapProviderSelectModal,
    translationId: 'title__select_route',
  },
  {
    name: EModalSwapRoutes.SwapSlippageSelect,
    component: SwapSlippageSelectModal,
    translationId: 'title__slippage',
  },
  {
    name: EModalSwapRoutes.SwapBuildTxDemo,
    component: SwapBuildTxDemo,
    translationId: 'title__transaction_details',
  },
  {
    name: EModalSwapRoutes.SwapHistoryList,
    component: SwapHistoryListModal,
    translationId: 'transaction__history',
  },
  {
    name: EModalSwapRoutes.SwapHistoryDetail,
    component: SwapHistoryDetailModal,
    translationId: 'content__details',
  },
];
