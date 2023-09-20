import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgHandCoins = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M9.808 8.82a5.502 5.502 0 0 1 3.531-7.064A4 4 0 1 0 9.808 8.82Z"
    />
    <Path
      fill="currentColor"
      d="M15 3a4.001 4.001 0 1 0 .002 8A4.001 4.001 0 0 0 15 3Z"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 15.18V19h1a1 1 0 0 1 .36.067l.004.002.017.006.072.027.278.1c.238.084.572.197.954.312.786.236 1.688.455 2.363.487 3.16.15 5.708-1.3 7.857-3.664.162-.178.192-.49-.012-.745-.238-.297-.77-.386-1.176-.064-.884.702-2.158 1.578-3.45 1.936-.72.2-1.428.326-1.99.405a13.6 13.6 0 0 1-1.175.127l-.022.001-.017.001h-.007A1 1 0 1 1 12.98 16h.016a15.45 15.45 0 0 0 .999-.109c1.245-.195 1.976-.556 2.317-.865a.864.864 0 0 0 .179-.213.191.191 0 0 0 .028-.075c0-.003 0-.01-.007-.027a.428.428 0 0 0-.095-.128c-.283-.283-1.11-.675-2.706-.66-1.425.013-3.338.353-5.712 1.258Zm10.393-1.155a2.393 2.393 0 0 0-.56-.857c-.843-.842-2.328-1.263-4.14-1.246-1.676.015-3.775.403-6.253 1.332A3 3 0 0 0 2 15v4a3 3 0 0 0 5.236 2H8.82l.248.089c.26.091.624.214 1.042.34.812.244 1.91.525 2.843.57 3.933.187 7.019-1.662 9.433-4.316.88-.969.833-2.387.07-3.34-1.01-1.264-2.823-1.3-3.981-.382l-.081.064Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHandCoins;
