const palette = {
  primary: {
    dark: '#3c3a38',
    yellow: '#FFBB00',
    yelllow_disabled: '#EAEAEA',
    light: '#F6F6F2',
    chipBar: '#E0E0D2',
    unselectedLight: '#B8B8AC',
    seaGreen: '#52987B',
  },
  secondary: {
    lightBrown: '#C29A70',
    completed: '#2EBF7A',
    uncompleted: '#C7CBB4',
    inProgress: '#F3C649',
    tanBrown: '#B56D4A'
  },
} as const;

export const kauriColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  primary: palette.primary,
  secondary: palette.secondary,
};
