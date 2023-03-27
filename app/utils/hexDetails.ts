import {kauriColors} from '../theme';
import {hexToRGBA} from './hexToRGBA';

export const dimensionNameMap = (dimension) => {
  const map = {
    dimension1: 'Empowering & uplifting communities',
    dimension2: 'Clean & responsible energy usage',
    dimension3: 'Protecting biodiversity & ethical treatment of animals',
    dimension4: 'Stable climate & clean climate',
    dimension5: 'Health and mental wellbeing'
  }
  return map[dimension]
}

export const dimensionColorMap = () => {
  return {
    dimension1: "#D49A9A",
    dimension2: "#8CD9D4",
    dimension3: "#9ABB9C",
    dimension4: "#93A0D0",
    dimension5: "#C09CC9",
    default: "#F6F6F2",
  };
};

export const dimensionColorMapContrast = () => {
  return {
    dimension1: "#F17D7D",
    dimension2: "#75F0E8",
    dimension3: "#6FE677",
    dimension4: "#7B92E8",
    dimension5: "#D37DE8",
    default: "#F6F6F2",
  };
};

export const hexMap: any = [
  [1, 2],
  [2, 3],
  [3, 2],
  [3, 1],
  [2, 1],
  [1, 1],
  [0, 2],
  [0, 1],
  [1, 3],
  [2, 4],
  [3, 3],
  [4, 2],
  [4, 1],
  [4, 0],
  [3, 0],
  [2, 0],
  [1, 0],
  [0, 0],
];
