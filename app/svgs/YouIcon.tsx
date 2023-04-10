import YouInactive from './TabIcons/YouInactive.svg';
import YouActive from './TabIcons/YouActive.svg';

interface YouIconProps {
  active: boolean;
}
export const YouIcon = ({active}: YouIconProps) => {
  return active ? <YouActive /> : <YouInactive />;
};
