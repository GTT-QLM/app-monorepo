import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgLayoutSearch = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M18.195 3.03c.395.033.789.104 1.167.297a3 3 0 0 1 1.311 1.311c.193.378.264.772.296 1.167.031.375.031.83.031 1.356V10a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.838c.528 0 .982 0 1.357.03ZM7.161 3H10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.161c0-.527 0-.981.03-1.356.033-.395.104-.789.297-1.167a3 3 0 0 1 1.311-1.311c.378-.193.772-.264 1.167-.296C6.18 3 6.635 3 7.161 3ZM3 14a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7.161c-.527 0-.981 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.311c-.193-.378-.264-.772-.296-1.167A17.9 17.9 0 0 1 3 16.839V14Z"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.828 14.172a4 4 0 1 0-.796 6.275l1.26 1.26a1 1 0 0 0 1.415-1.413l-1.26-1.261a4.001 4.001 0 0 0-.619-4.86Zm-4.242 1.414a2 2 0 1 1 2.828 2.828 2 2 0 0 1-2.828-2.828Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgLayoutSearch;
