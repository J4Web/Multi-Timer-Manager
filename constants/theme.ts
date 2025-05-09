import { Platform } from 'react-native';

// Color system
export const colors = {
  primary: {
    50: '#E5F2FF',
    100: '#CCE4FF',
    200: '#99C9FF',
    300: '#66ADFF',
    400: '#3392FF',
    500: '#0A84FF', // Main primary color
    600: '#0064D1',
    700: '#0050A5',
    800: '#003C7A',
    900: '#00284F',
  },
  secondary: {
    50: '#EFEEFD',
    100: '#DEDEFB',
    200: '#BEBDF7',
    300: '#9D9BF3',
    400: '#7D7AEF',
    500: '#5E5CE6', // Main secondary color
    600: '#4B4AB8',
    700: '#39398A',
    800: '#26275C',
    900: '#14142E',
  },
  accent: {
    50: '#FFE5EC',
    100: '#FFCCD9',
    200: '#FF99B3',
    300: '#FF668C',
    400: '#FF3366',
    500: '#FF2D55', // Main accent color
    600: '#CC0D35',
    700: '#990A28',
    800: '#66061B',
    900: '#33030E',
  },
  success: {
    50: '#E6F7ED',
    100: '#CCEEDB',
    200: '#99DDB7',
    300: '#66CC93',
    400: '#33BB6F',
    500: '#30D158', // Main success color
    600: '#00A541',
    700: '#007D31',
    800: '#005421',
    900: '#002A10',
  },
  warning: {
    50: '#FFF8E5',
    100: '#FFF1CC',
    200: '#FFE399',
    300: '#FFD466',
    400: '#FFC633',
    500: '#FFD60A', // Main warning color
    600: '#CCA800',
    700: '#997D00',
    800: '#665300',
    900: '#332A00',
  },
  error: {
    50: '#FFE9E7',
    100: '#FFD3CF',
    200: '#FFA79F',
    300: '#FF7B6F',
    400: '#FF5F40',
    500: '#FF453A', // Main error color
    600: '#CC1D12',
    700: '#99160D',
    800: '#660E09',
    900: '#330704',
  },
  neutral: {
    50: '#F9F9F9',
    100: '#F2F2F2',
    200: '#E6E6E6',
    300: '#D1D1D1',
    400: '#B0B0B0',
    500: '#909090',
    600: '#636363',
    700: '#484848',
    800: '#2A2A2A',
    900: '#1A1A1A',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    none: 1,
    tight: 1.2, // for headings
    normal: 1.5, // for body text
    loose: 1.8,
  },
};

// Spacing system (8pt grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows
export const shadows = {
  none: {
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
};

// Z-index for managing stacking contexts
export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
};

// Transitions
export const transitions = {
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    fastest: 100,
    fast: 150,
    normal: 200,
    slow: 300,
    slowest: 400,
  },
};

// Platform specific adjustments
export const platformAdjustments = {
  buttonVerticalPadding: Platform.OS === 'ios' ? spacing.sm : spacing.xs,
  inputPadding: Platform.OS === 'ios' ? spacing.md : spacing.sm,
  statusBarHeight: Platform.OS === 'ios' ? 44 : 0,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndices,
  transitions,
  platformAdjustments,
};