import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgNfc = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M18.67 4.504a1 1 0 0 1 1.37.349A13.94 13.94 0 0 1 22 12a13.94 13.94 0 0 1-1.96 7.147 1 1 0 0 1-1.719-1.022A11.94 11.94 0 0 0 19.999 12c0-2.24-.612-4.333-1.678-6.125a1 1 0 0 1 .348-1.37Zm-3.186 2.397a1 1 0 0 1 1.352.414A9.96 9.96 0 0 1 18 12c0 1.69-.42 3.286-1.163 4.684a1 1 0 1 1-1.766-.938A7.96 7.96 0 0 0 16 12c0-1.356-.337-2.63-.93-3.747a1 1 0 0 1 .414-1.352Zm-5.283.498a1 1 0 0 1 1.4-.199A5.992 5.992 0 0 1 14 12a5.99 5.99 0 0 1-2.4 4.8 1 1 0 0 1-1.154.032l-4-2.667a1 1 0 0 1 1.109-1.664l3.359 2.24A3.99 3.99 0 0 0 12 12a3.992 3.992 0 0 0-1.6-3.202 1 1 0 0 1-.199-1.4ZM4.399 7.2a1 1 0 0 1 1.155-.032l4 2.667a1 1 0 0 1-1.109 1.664l-3.359-2.24A3.989 3.989 0 0 0 4 12c0 1.309.627 2.47 1.6 3.201A1 1 0 0 1 4.4 16.8 5.992 5.992 0 0 1 2 12a5.989 5.989 0 0 1 2.399-4.8Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgNfc;
