import {View} from 'react-native';
import Filter from './OptionIcons/FilterIcon.svg';

export const FilterIcon = () => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Filter />
    </View>
  );
};
