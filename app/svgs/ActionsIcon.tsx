import ActionsInactive from './TabIcons/ActionsInactive.svg';
import ActionsActive from './TabIcons/ActionsActive.svg';

interface ActionsIconProps {
  active: boolean;
}
export const ActionsIcon = ({active}: ActionsIconProps) => {
  return active ? <ActionsActive /> : <ActionsInactive />;
};
