import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgMedium = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M6.769 18.82c3.738 0 6.768-3.051 6.768-6.815 0-3.764-3.03-6.815-6.768-6.815C3.03 5.19 0 8.24 0 12.005c0 3.765 3.03 6.815 6.769 6.815Zm10.809-.4c1.87 0 3.385-2.872 3.385-6.415 0-3.542-1.515-6.415-3.385-6.415-1.869 0-3.384 2.873-3.384 6.415s1.515 6.415 3.384 6.415Zm5.232-.667c.657 0 1.19-2.573 1.19-5.748 0-3.174-.532-5.748-1.19-5.748-.658 0-1.19 2.574-1.19 5.748 0 3.174.532 5.748 1.19 5.748Z"
    />
  </Svg>
);
export default SvgMedium;