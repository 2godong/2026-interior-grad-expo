import { colors } from "../lib/colorPalette";

export const fonts = {
  family: {
    base: '"A2Z", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
  },
  weight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
} as const;

export const theme = {
  colors,
  fonts,
} as const;

export type ThemeType = typeof theme;
