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
  | 'superTitleSans'
  | 'captionsExtraBold'
  | 'titleBigger'
  | 'titleSans'
  | 'captionsMediumBold'

type textStylesMap = {[style in textStyles]: TextStyle};

const letterSpacings = {
  32:0.41,
  28:0.38,
  24:0.07,
  22: -0.26,
  20: -0.45,
  13: -0.15,
  12: 0,
  10: 0.12
}

const textStyles: textStylesMap = {
  superTitle:{
    fontSize: 32,
    fontFamily: kauriTypography.secondary.medium,
    letterSpacing: letterSpacings[32]
  },
  superTitleSans:{
    fontSize: 32,
    fontFamily: kauriTypography.primary.bold,
    letterSpacing: letterSpacings[32]
  },
  titleBigger: {
    fontSize: 28,
    fontFamily: kauriTypography.secondary.medium,
    letterSpacing: letterSpacings[28]
  },
  titleBig: {
    fontSize: 24,
    fontFamily: kauriTypography.secondary.medium,
    letterSpacing: letterSpacings[24]
  },
  titleSmall: {
    fontSize: 22,
    fontFamily: kauriTypography.secondary.medium,
    letterSpacing: letterSpacings[22]
  },
  titleNormal: {
    fontSize: 20,
    fontFamily: kauriTypography.secondary.light,
    letterSpacing: letterSpacings[20]
  },
  titleSans: {
    fontSize: 20,
    fontFamily: kauriTypography.primary.extraBold,
    letterSpacing: letterSpacings[20]
  },
  paragraph: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.medium,
    letterSpacing: letterSpacings[14]
  },
  subtitle: {
    fontSize: 14,
    fontFamily: kauriTypography.primary.semiBold,
    letterSpacing: letterSpacings[14]
  },
  captions: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.medium,
    letterSpacing: letterSpacings[12]
  },
  captionsBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.semiBold,
    letterSpacing: letterSpacings[12]
  },
  captionsMediumBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.bold,
    letterSpacing: letterSpacings[12]
  },
  captionsExtraBold: {
    fontSize: 12,
    fontFamily: kauriTypography.primary.extraBold,
    letterSpacing: letterSpacings[12]
  },
  smallTextsSemi: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.semiBold,
    letterSpacing: letterSpacings[12]
  },
  smallTexts: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.bold,
    letterSpacing: letterSpacings[10]
  },
  smallTextsBold: {
    fontSize: 10,
    fontFamily: kauriTypography.primary.extraBold,
    letterSpacing: letterSpacings[10]
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
