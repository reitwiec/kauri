import HomeInactive from './TabIcons/HomeInactive.svg';
import HomeActive from './TabIcons/HomeActive.svg';

interface HomeIconProps {
  active: boolean;
}
export const HomeIcon = ({active}: HomeIconProps) => {
  return active ? <HomeActive /> : <HomeInactive />;
};
