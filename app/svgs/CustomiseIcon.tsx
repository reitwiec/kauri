import {View} from 'react-native';
import Customise from './OptionIcons/CustomiseIcon.svg';

export const CustomiseIcon = () => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Customise />
    </View>
  );
};
