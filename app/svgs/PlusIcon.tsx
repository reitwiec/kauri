import {View} from 'react-native';
import Plus from './OptionIcons/PlusIcon.svg';

export const PlusIcon = () => {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Plus />
    </View>
  );
};
