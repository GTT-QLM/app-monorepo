import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgAlt = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
    />
    <Path
      fill="currentColor"
      d="M5.71 15.104c-.56 0-.897-.32-.897-.851 0-.154.046-.378.125-.59l1.34-3.702c.257-.726.693-1.054 1.395-1.054.75 0 1.182.316 1.452 1.054l1.353 3.703c.083.228.117.394.117.585 0 .498-.37.855-.88.855-.52 0-.789-.237-.938-.818l-.104-.407h-1.95l-.105.378c-.166.602-.431.847-.909.847Zm1.344-2.536h1.25l-.623-2.175h-.033l-.594 2.175ZM12.014 15c-.56 0-.88-.332-.88-.921v-4.25c0-.59.32-.922.88-.922s.88.332.88.922v3.768h1.656c.465 0 .776.253.776.702 0 .448-.303.701-.776.701h-2.536Zm4.819.104c-.56 0-.88-.332-.88-.922v-3.768h-.884c-.464 0-.776-.253-.776-.702 0-.448.303-.701.776-.701h3.528c.473 0 .776.253.776.701 0 .449-.31.702-.776.702h-.884v3.768c0 .59-.32.922-.88.922Z"
    />
  </Svg>
);
export default SvgAlt;
