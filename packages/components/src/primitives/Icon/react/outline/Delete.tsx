import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgDelete = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.416 5H3a1 1 0 0 0 0 2h1.064l.814 12.2A3 3 0 0 0 7.87 22h8.258a3 3 0 0 0 2.993-2.8L19.936 7H21a1 1 0 1 0 0-2h-4.416a5 5 0 0 0-9.168 0Zm2.348 0h4.472c-.55-.614-1.348-1-2.236-1-.888 0-1.687.386-2.236 1Zm6.087 2H6.07l.804 12.067a1 1 0 0 0 .998.933h8.258a1 1 0 0 0 .998-.933L17.93 7h-2.036a1 1 0 0 1-.044 0ZM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDelete;
