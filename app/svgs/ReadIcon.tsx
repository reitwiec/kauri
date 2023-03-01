import ReadInactive from './TabIcons/ReadInactive.svg';
import ReadActive from './TabIcons/ReadActive.svg';

interface ReadIconProps {
  active: boolean;
}
export const ReadIcon = ({active}: ReadIconProps) => {
  return active ? <ReadActive /> : <ReadInactive />;
};
