import {kauriColors} from '../theme';
import {hexToRGBA} from './hexToRGBA';

export const dimensionColorMap = (alpha: number) => {
  return {
    dimension1: hexToRGBA('#9ABB9C', alpha),
    dimension2: hexToRGBA('#D49A9A', alpha),
    dimension3: hexToRGBA('#8CD9D4', alpha),
    dimension4: hexToRGBA('#E4B281', alpha),
    dimension5: hexToRGBA('#93A0D0', alpha),
    dimension6: hexToRGBA('#C09CC9', alpha),
    default: hexToRGBA(kauriColors.primary.chipBar, 0.3),
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
