import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgDocumentReport = (props: SvgProps) => (
  <Svg
    fill="currentColor"
    viewBox="0 0 20 20"
    accessibilityRole="image"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6zm2 10a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3zm2-3a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1zm4-1a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0V8z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDocumentReport;
