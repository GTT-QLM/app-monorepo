import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgBubbleAnnotation = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.567 5.357C17.69 3.792 15.065 3 12 3c-3.065 0-5.69.792-7.567 2.357C2.533 6.94 1.5 9.233 1.5 12c0 .816.27 1.819.513 2.578.253.791.524 1.454.6 1.638l.013.03.008.018.002.005c.01.027.09.275.033.708-.06.45-.277 1.155-.966 2.063a1 1 0 0 0 .369 1.508c1.387.657 2.773.424 3.724.094.456-.159.84-.348 1.12-.504C8.557 20.85 10.38 21 12 21c3.065 0 5.69-.792 7.567-2.357C21.467 17.06 22.5 14.766 22.5 12c0-2.767-1.033-5.06-2.933-6.643ZM2.636 16.269v-.002.003-.001ZM6.25 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm4.5 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm5.75 1.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBubbleAnnotation;
