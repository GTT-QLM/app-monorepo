import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgBubble = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M12 3c3.065 0 5.69.792 7.567 2.357C21.467 6.94 22.5 9.233 22.5 12s-1.033 5.06-2.933 6.643C17.69 20.208 15.065 21 12 21c-1.62 0-3.443-.15-5.084-.862-.28.156-.664.345-1.12.504-.951.33-2.337.563-3.724-.094a1 1 0 0 1-.369-1.508c.689-.908.905-1.612.966-2.063.057-.433-.024-.681-.033-.708v.001-.003.002l-.002-.005-.008-.018-.012-.03a21.754 21.754 0 0 1-.601-1.638C1.769 13.818 1.5 12.817 1.5 12c0-2.767 1.033-5.06 2.933-6.643C6.31 3.792 8.935 3 12 3Z"
    />
  </Svg>
);
export default SvgBubble;
