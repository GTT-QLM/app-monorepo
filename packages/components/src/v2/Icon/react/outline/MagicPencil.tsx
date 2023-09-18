import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgMagicPencil = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M8.72 3.56a.357.357 0 0 1-.16.16l-.921.46a.357.357 0 0 0 0 .64l.921.46c.07.035.125.09.16.16l.46.921a.357.357 0 0 0 .64 0l.46-.921a.357.357 0 0 1 .16-.16l.921-.46a.357.357 0 0 0 0-.64l-.921-.46a.357.357 0 0 1-.16-.16l-.46-.921a.357.357 0 0 0-.64 0l-.46.921ZM4.407 7.184a.5.5 0 0 1-.224.224l-1.29.645a.5.5 0 0 0 0 .894l1.29.645a.5.5 0 0 1 .224.224l.645 1.29a.5.5 0 0 0 .894 0l.645-1.29a.5.5 0 0 1 .224-.224l1.29-.645a.5.5 0 0 0 0-.894l-1.29-.645a.5.5 0 0 1-.224-.224l-.645-1.29a.5.5 0 0 0-.894 0l-.645 1.29Z"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="m7.106 13.017 10.17-8.844a2.516 2.516 0 0 1 3.55 3.55l-8.843 10.17A4.5 4.5 0 0 1 7.5 22H4a1 1 0 0 1-1-1v-3.5a4.5 4.5 0 0 1 4.106-4.483Zm4.382 2.397a4.52 4.52 0 0 0-1.902-1.903l9.003-7.829a.516.516 0 0 1 .728.729l-7.829 9.003ZM7.5 15A2.5 2.5 0 0 0 5 17.5V20h2.5a2.5 2.5 0 0 0 0-5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgMagicPencil;
