import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgDollar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-6.001a1 1 0 1 0-2 0v.598c-.513.105-1 .304-1.412.63-.713.561-1.075 1.395-1.075 2.374 0 1.144.471 1.94 1.193 2.472.564.416 1.275.653 1.808.831l.165.055.102.035c.62.21 1.03.348 1.327.568.216.159.379.361.379.862 0 .457-.148.674-.313.803-.201.16-.574.298-1.174.298-.718 0-1.146-.322-1.356-.699a1 1 0 0 0-1.747.973A3.324 3.324 0 0 0 11 17.401V18a1 1 0 1 0 2 0v-.572c.513-.105 1-.304 1.412-.63.713-.562 1.075-1.395 1.075-2.374 0-1.144-.471-1.941-1.193-2.473-.564-.415-1.275-.653-1.808-.83l-.165-.056-.102-.034c-.62-.21-1.03-.349-1.327-.568-.216-.16-.379-.361-.379-.862 0-.457.148-.674.313-.804C11.027 8.64 11.4 8.5 12 8.5c.718 0 1.146.322 1.356.699a1 1 0 0 0 1.747-.974A3.323 3.323 0 0 0 13 6.625v-.626Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDollar;
