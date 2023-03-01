import {View} from 'react-native';
import Cart from './OptionIcons/CartIcon.svg';

export const CartIcon = () => {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Cart />
    </View>
  );
};
