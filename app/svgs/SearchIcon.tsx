import {View} from 'react-native';
import Search from './OptionIcons/SearchIcon.svg';

export const SearchIcon = () => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Search />
    </View>
  );
};
