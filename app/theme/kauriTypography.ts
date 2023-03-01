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
    normal: 'Recoleta-Regular',
    medium: 'Recoleta-Medium',
    semiBold: 'Recoleta-SemiBold',
    bold: 'Recoleta-Bold',
    extraBold: 'Recoleta-ExtraBold',
  },
};

export const kauriTypography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  primary: fonts.manrope,
  secondary: fonts.recoleta,
};
