const fonts = {
  manrope: {
    extraLight: 'Manrope-ExtraLight',
    light: 'Manrope-Light',
    normal: 'Manrope-Regular',
    medium: 'Manrope-Medium',
    semiBold: 'Manrope-SemiBold',
    bold: 'Manrope-Bold',
    extraBold: 'Manrope-ExtraBold',
  },
  recoleta: {
    extraLight: 'Recoleta-Thin',
    light: 'Recoleta-Light',
    regular: 'Recoleta-Regular',
    medium: 'Recoleta-Medium',
    semiBold: 'Recoleta-SemiBold',
    bold: 'Recoleta-Bold',
    extraBold: 'Recoleta-ExtraBold',
  },
  peachi: {
    light: 'FONTSPRINGDEMO-PeachiLightRegular',
    bold: 'FONTSPRINGDEMO-PeachiBold',
    black: 'FONTSPRINGDEMO-PeachiBlackRegular',
    medium: 'FONTSPRINGDEMO-PeachiMediumRegular',
    regular: 'FONTSPRINGDEMO-PeachiRegular',
    thin: 'FONTSPRINGDEMO-PeachiThinRegular'
  }
};

export const kauriTypography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  primary: fonts.manrope,
  secondary: fonts.peachi,
};
