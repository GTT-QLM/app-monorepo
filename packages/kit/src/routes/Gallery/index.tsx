import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ComponentsScreen from '@onekeyhq/kit/src/views/Components';
import ButtonsGallery from '@onekeyhq/kit/src/views/Components/stories/Buttons';
import IconGallery from '@onekeyhq/kit/src/views/Components/stories/Icon';
import TypographyGallery from '@onekeyhq/kit/src/views/Components/stories/Typography';
import BadgeGallery from '@onekeyhq/kit/src/views/Components/stories/Badge';

export enum GalleryRoutes {
  Components = 'components',
  ComponentTypography = 'component/typography',
  ComponentIcon = 'component/icon',
  ComponentButton = 'component/button',
  ComponentBadge = 'component/badge',
}

export const stackScreenList = [
  { name: GalleryRoutes.Components, component: ComponentsScreen },
  {
    name: GalleryRoutes.ComponentTypography,
    component: TypographyGallery,
  },
  { name: GalleryRoutes.ComponentIcon, component: IconGallery },
  { name: GalleryRoutes.ComponentButton, component: ButtonsGallery },
  { name: GalleryRoutes.ComponentBadge, component: BadgeGallery },
];

const DevStack = createNativeStackNavigator();

const DevScreen = () => (
  <DevStack.Navigator>
    <DevStack.Group>
      {stackScreenList.map((stack) => (
        <DevStack.Screen
          key={stack.name}
          name={stack.name}
          component={stack.component}
        />
      ))}
    </DevStack.Group>
  </DevStack.Navigator>
);

export default DevScreen;
