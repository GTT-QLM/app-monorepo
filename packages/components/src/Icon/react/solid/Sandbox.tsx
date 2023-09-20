import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgSandbox = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.946 4.33a2.789 2.789 0 0 1 3.15-2.373l1.409.198a2.789 2.789 0 0 1 .277 5.47L18 7.817l-.553 3.937L20.897 15H21a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1h.038l1.503-1.768-.99-4.449a2.001 2.001 0 0 1 1.108-2.249l-.012-.085a3 3 0 1 1 5.941-.835l.012.085c.902.14 1.628.89 1.689 1.85l.27 4.292 2.954-.695.507-3.607-.698-.4a2.789 2.789 0 0 1-1.376-2.808Zm3.308 1.61 1.05-.257a.789.789 0 0 0-.078-1.547l-1.408-.198a.789.789 0 0 0-.502 1.465l.938.538Zm-10.627.23 1.98-.277a1 1 0 0 0-1.98.278ZM17.978 15H5.662l1.859-2.186a1 1 0 0 1 1.188-.258l2.483 1.17a2.21 2.21 0 0 0 1.448.15l3.316-.78L17.978 15Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgSandbox;
