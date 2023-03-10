import {View} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

export const OptionsDotsIcon = () => {
  return (
    <View>
      <Svg width={24} height={4} viewBox={'0 0 24 4'} fill="none">
        <Circle cx={1.6} cy={2} r={1.6} fill="#3C3A38" />
        <Circle cx={9.6} cy={2} r={1.6} fill="#3C3A38" />
        <Circle cx={17.6} cy={2} r={1.6} fill="#3C3A38" />
      </Svg>
    </View>
  );
};
