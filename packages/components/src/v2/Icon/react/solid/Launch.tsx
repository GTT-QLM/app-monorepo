import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgLaunch = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.632 3.442c2.101-1.19 4.817-1.698 8.44-1.44a1 1 0 0 1 .925.927c.26 3.622-.249 6.338-1.44 8.439-1.088 1.92-2.689 3.226-4.557 4.239v1.473a3 3 0 0 1-1.048 2.278l-2.801 2.401a1 1 0 0 1-1.599-.44l-.002-.006-.01-.028a13.273 13.273 0 0 0-.199-.543 24.43 24.43 0 0 0-.6-1.425c-.527-1.142-1.216-2.378-1.948-3.11-.732-.732-1.968-1.421-3.11-1.948a24.12 24.12 0 0 0-1.968-.8l-.028-.009-.006-.002a1.002 1.002 0 0 1-.44-1.599l2.401-2.801A3 3 0 0 1 6.92 8h1.473c1.013-1.868 2.318-3.47 4.239-4.558ZM15.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      d="M5.207 16.793a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 1 1-1.414-1.414l2.5-2.5a1 1 0 0 1 1.414 0Zm2 3.414a1 1 0 1 0-1.414-1.414l-1.5 1.5a1 1 0 1 0 1.414 1.414l1.5-1.5Z"
    />
  </Svg>
);
export default SvgLaunch;
