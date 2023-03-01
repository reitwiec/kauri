import ShopInactive from './TabIcons/ShopInactive.svg';
import ShopActive from './TabIcons/ShopActive.svg';

interface ShopIconProps {
  active: boolean;
}
export const ShopIcon = ({active}: ShopIconProps) => {
  return active ? <ShopActive /> : <ShopInactive />;
};
