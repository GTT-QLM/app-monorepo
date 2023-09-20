import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgHomeRoof = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M12.492 1.791a2 2 0 0 0-.984 0c-.374.095-.695.327-.95.512l-.072.05-8.568 6.135a1 1 0 1 0 1.164 1.626L4 9.457v7.381c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 0 0 1.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031h7.678c.527 0 .981 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V9.457l.918.657a1 1 0 1 0 1.164-1.626l-8.569-6.134-.07-.051c-.256-.185-.577-.417-.951-.512Z"
    />
  </Svg>
);
export default SvgHomeRoof;
