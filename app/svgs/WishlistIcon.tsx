import {View} from 'react-native';
import Wishlist from './OptionIcons/WishlistIcon.svg';

export const WishlistIcon = () => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Wishlist />
    </View>
  );
};
