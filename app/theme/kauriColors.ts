const palette = {
  primary: {
    dark: '#3c3a38',
    yellow: '#FFBB00',
    yelllow_disabled: '#F0CF75',
    light: '#F6F6F2',
    chipBar: '#E0E0D2',
    unselectedLight: '#D0D0C8',
    seaGreen: '#648678',
  },
  secondary: {
    lightBrown: '#C29A70',
    completed: '#2EBF7A',
    uncompleted: '#C7CBB4',
    inProgress: '#F3C649',
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