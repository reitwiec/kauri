import {kauriColors} from '../theme';
import {hexToRGBA} from './hexToRGBA';

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
