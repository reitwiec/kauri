import type {TextStyle, ViewStyle} from 'react-native';
import {kauriColors} from './kauriColors';
import {kauriTypography} from './kauriTypography';

type textStyles =
  | 'titleBig'
  | 'titleSmall'
  | 'paragraph'
  | 'captions'
  | 'captionsBold'
  | 'subtitle'
  | 'smallTexts'
  | 'smallTextsBold'
  | 'titleNormal'
  | 'smallTextsSemi'
  | 'smallSerif'
  | 'smallSerifBigger'
  | 'superTitle'
  | 'captionsExtraBold'
  | 'titleBigger'
  | 'titleSans'

type textStylesMap = {[style in textStyles]: TextStyle};

const textStyles: textStylesMap = {
  superTitle:{
    fontSize: 32,
    fontFamily: kauriTypography.secondary.medium,
  },
  titleBigger: {
    fontSize: 28,
    fontFamily: kauriTypography.secondary.medium,
  },
  titleBig: {
    fontSize: 24,
    fontFamily: kauriTypography.secondary.medium,
  },
  titleSmall: {
    fontSize: 22,
    fontFamily: kauriTypography.secondary.medium,
  },
  titleNormal: {
    fontSize: 20,
    fontFamily: kauriTypography.secondary.light,
  },
  titleSans: {
    fontSize: 20,
    fontFamily: kauriTypography.primary.extraBold
  },
  paragraph: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.medium,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.semiBold,
  },
  captions: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.medium,
  },
  captionsBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.semiBold,
  },
  captionsExtraBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.extraBold,
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
