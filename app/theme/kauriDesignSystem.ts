import type {ViewStyle} from 'react-native';
import {kauriColors} from './kauriColors';
import {kauriTypography} from './kauriTypography';

type textSettings = {
  fontSize: number;
  fontFamily: string;
};
type textStyles =
  | 'title'
  | 'paragraph'
  | 'captions'
  | 'captions'
  | 'captionsBold'
  | 'subtitle'
  | 'smallTexts'
  | 'smallTextsBold'
  | 'titleNormal'
  | 'smallTextsSemi'
  | 'smallSerif'
  | 'smallSerifBigger'

type textStylesMap = {[style in textStyles]: textSettings};

const textStyles: textStylesMap = {
  title: {
    fontSize: 24,
    fontFamily: kauriTypography.secondary.medium,
  },
  titleNormal: {
    fontSize: 20,
    fontFamily: kauriTypography.secondary.normal,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.normal,
  },
  captions: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.medium,
  },
  captionsBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.semiBold,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.semiBold,
  },
  smallTextsSemi: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.semiBold,
  },
  smallTexts: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.bold,
  },
  smallTextsBold: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.extraBold,
  },
  smallSerifBigger: {
    fontSize: 12,
    fontFamily: kauriTypography.secondary.medium,
  }, 
  smallSerif: {
    fontSize: 10,
    fontFamily: kauriTypography.secondary.medium,
  },
};

interface commonStylesInterface {
  [name: string]: ViewStyle;
}
const commonStyles: commonStylesInterface = {
  yellowPrimaryBtn: {
    paddingHorizontal: 48,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: kauriColors.primary.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowPrimaryBtnDisabled: {
    paddingHorizontal: 48,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: kauriColors.primary.yelllow_disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: kauriColors.primary.light,
  },
};

export const designSystem = {
  textStyles,
  yellowPrimaryBtn: {
    enabled: commonStyles.yellowPrimaryBtn,
    disabled: commonStyles.yellowPrimaryBtnDisabled,
  },
  card: commonStyles.card,
};
