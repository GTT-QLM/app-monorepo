import type { DemoDeveloperTabParamList } from '../../../views/Components/stories/NavigatorRoute/Tab/RouteParamTypes';
import type { TabHomeParamList } from './Home/Routes';
import type { TabMeParamList } from './Me/Routes';

export enum TabRoutes {
  Home = 'Home',
  Me = 'Me',
  Developer = 'Developer',
}

export type TabStackParamList = {
  [TabRoutes.Home]: TabHomeParamList;
  [TabRoutes.Me]: TabMeParamList;
  [TabRoutes.Developer]: DemoDeveloperTabParamList;
};
