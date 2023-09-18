import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgAppStore = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        d="m5.47 20.299-.61.94c-.43.72-1.37.97-2.1.55-.74-.42-.99-1.35-.57-2.08l.38-.56c.14-.21.5-.57 1.22-.51 0 0 1.69.18 1.82 1.05 0 0 .01.28-.18.57l.04.04Zm16.99-6.13h-3.62c-.25-.02-.36-.11-.4-.16l-.01-.01-3.46-5.61c-.39-.58-.99.89-.99.89-.73 1.64.1 3.5.38 4.07l4.72 7.85c.42.72 1.36.97 2.09.55.73-.42.98-1.35.56-2.08l-1.35-2.31c-.03-.06-.08-.21.2-.21h1.82c.84 0 1.53-.68 1.53-1.52s-.69-1.52-1.54-1.52l.07.06Zm-8.71 2.06s.19.97-.56.97l-11.68-.01c-.85 0-1.54-.68-1.54-1.52s.68-1.52 1.53-1.52h3.43c.55-.04.68-.35.68-.35l4.48-7.7-.01-.01c.08-.15.01-.29 0-.32L8.59 3.21c-.43-.73-.18-1.66.56-2.08.73-.42 1.66-.18 2.09.55l.68 1.17.68-1.18c.42-.73 1.36-.98 2.093-.56.73.41.98 1.34.56 2.07l-6.24 10.7c-.03.06-.04.16.16.18h2.04s2.15.06 2.45 2.06l.087.109Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgAppStore;
