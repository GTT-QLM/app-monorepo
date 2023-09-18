import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgMagicHat = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8c-2.266 0-4.352.229-5.9.616-.766.191-1.457.435-1.98.745C3.663 9.63 3 10.152 3 11c0 .847.663 1.369 1.12 1.639.257.151.554.287.88.41V19c0 .714.435 1.235.853 1.564.428.338.987.599 1.588.799C8.654 21.767 10.266 22 12 22s3.346-.233 4.559-.637c.601-.2 1.16-.461 1.588-.799.418-.33.853-.85.853-1.564v-5.95c.326-.123.623-.259.88-.41.457-.27 1.12-.792 1.12-1.64 0-.848-.663-1.37-1.12-1.64-.523-.309-1.214-.553-1.98-.744C16.351 8.229 14.265 8 12 8Zm-5.414 2.556c-.464.116-.835.24-1.114.36a.09.09 0 0 0 0 .168c.28.12.65.244 1.114.36C7.933 11.781 9.848 12 12 12c2.152 0 4.067-.219 5.414-.556.464-.116.835-.24 1.114-.36a.09.09 0 0 0 0-.168c-.28-.12-.65-.244-1.114-.36C16.067 10.22 14.152 10 12 10c-2.152 0-4.067.22-5.414.556ZM17 13.58c-1.416.267-3.148.42-5 .42-1.852 0-3.584-.153-5-.42v5.333a.83.83 0 0 0 .09.08c.179.14.499.311.984.473.958.32 2.347.534 3.926.534 1.58 0 2.967-.215 3.926-.534.485-.162.805-.332.984-.473a.831.831 0 0 0 .09-.08V13.58Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      d="M13.553 1.895a.5.5 0 0 1 .894 0c.496.991.667 1.162 1.659 1.658a.5.5 0 0 1 0 .894c-.992.496-1.163.667-1.659 1.659a.5.5 0 0 1-.894 0c-.496-.992-.667-1.163-1.659-1.659a.5.5 0 0 1 0-.894c.992-.496 1.163-.667 1.659-1.658Zm-5 2a.5.5 0 0 1 .894 0c.174.348.31.484.659.658a.5.5 0 0 1 0 .894c-.349.175-.485.31-.659.659a.5.5 0 0 1-.894 0c-.174-.349-.31-.484-.659-.659a.5.5 0 0 1 0-.894c.349-.174.485-.31.659-.658Z"
    />
  </Svg>
);
export default SvgMagicHat;
