import { createTheme, type Theme } from '@mui/material/styles';
import { designTokens } from './designTokens';

// Normal Theme (Light Mode)
export const normalTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.brand.primary,
      light: '#2c5282',
      dark: '#153e75',
      contrastText: designTokens.neutral.white,
    },
    secondary: {
      main: designTokens.brand.secondary,
      light: '#48bb78',
      dark: '#2f855a',
      contrastText: designTokens.neutral.white,
    },
    background: {
      default: designTokens.neutral.gray50,
      paper: designTokens.neutral.white,
    },
    text: {
      primary: designTokens.neutral.gray900,
      secondary: designTokens.neutral.gray600,
    },
    error: {
      main: designTokens.semantic.error,
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: designTokens.semantic.warning,
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: designTokens.semantic.success,
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: designTokens.semantic.info,
      light: '#60a5fa',
      dark: '#2563eb',
    },
    divider: designTokens.neutral.gray200,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    h1: {
      fontSize: designTokens.typography.fontSize['4xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.neutral.gray900,
    },
    h2: {
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.neutral.gray900,
    },
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray900,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray700,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray600,
    },
    button: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.lg),
  },
  spacing: 8, // 8px base unit
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: designTokens.shadow.md,
          },
        },
        contained: {
          backgroundColor: designTokens.brand.primary,
          '&:hover': {
            backgroundColor: '#2c5282',
          },
        },
        outlined: {
          borderColor: designTokens.brand.primary,
          color: designTokens.brand.primary,
          '&:hover': {
            backgroundColor: `${designTokens.brand.primary}08`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius['2xl'],
          boxShadow: designTokens.shadow.lg,
          border: `1px solid ${designTokens.neutral.gray200}`,
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Lighter blue for dark mode
      light: '#93c5fd',
      dark: '#3b82f6',
      contrastText: designTokens.neutral.gray900,
    },
    secondary: {
      main: '#34d399', // Lighter green for dark mode
      light: '#6ee7b7',
      dark: '#10b981',
      contrastText: designTokens.neutral.gray900,
    },
    background: {
      default: designTokens.neutral.gray900,
      paper: designTokens.neutral.gray800,
    },
    text: {
      primary: designTokens.neutral.gray100,
      secondary: designTokens.neutral.gray300,
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#ef4444',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#f59e0b',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    info: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    divider: designTokens.neutral.gray700,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    h1: {
      fontSize: designTokens.typography.fontSize['4xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.neutral.gray100,
    },
    h2: {
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.neutral.gray100,
    },
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray100,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray200,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.neutral.gray300,
    },
    button: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.lg),
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#60a5fa',
          '&:hover': {
            backgroundColor: '#3b82f6',
          },
        },
        outlined: {
          borderColor: '#60a5fa',
          color: '#60a5fa',
          '&:hover': {
            backgroundColor: '#60a5fa15',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius['2xl'],
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${designTokens.neutral.gray700}`,
        },
      },
    },
  },
});

// High Contrast Theme (WCAG AAA Compliant)
export const highContrastTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Pure black for maximum contrast
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0066cc', // High contrast blue
      light: '#3388dd',
      dark: '#004499',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    error: {
      main: '#cc0000', // High contrast red
      light: '#ff3333',
      dark: '#990000',
    },
    warning: {
      main: '#cc6600', // High contrast orange
      light: '#ff8833',
      dark: '#994400',
    },
    success: {
      main: '#006600', // High contrast green
      light: '#009900',
      dark: '#004400',
    },
    info: {
      main: '#0066cc', // High contrast blue
      light: '#3388dd',
      dark: '#004499',
    },
    divider: '#000000',
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    h1: {
      fontSize: designTokens.typography.fontSize['4xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: '#000000',
    },
    h2: {
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: '#000000',
    },
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.bold, // Extra bold for high contrast
      lineHeight: designTokens.typography.lineHeight.normal,
      color: '#000000',
    },
    body1: {
      fontSize: designTokens.typography.fontSize.lg, // Larger text for readability
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.relaxed,
      color: '#000000',
    },
    body2: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: '#333333',
    },
    button: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.bold,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.md), // Less rounded for clarity
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          padding: `${designTokens.spacing.lg} ${designTokens.spacing['2xl']}`,
          boxShadow: '0 0 0 2px #000000',
          border: '2px solid #000000',
          minHeight: '48px', // Larger touch target
          '&:hover': {
            boxShadow: '0 0 0 3px #000000',
          },
          '&:focus': {
            boxShadow: '0 0 0 4px #0066cc',
            outline: 'none',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
        outlined: {
          borderColor: '#000000',
          color: '#000000',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            borderColor: '#000000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          boxShadow: '0 0 0 2px #000000',
          border: '2px solid #000000',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066cc',
              borderWidth: '3px',
            },
          },
        },
      },
    },
  },
});

export type ThemeMode = 'normal' | 'dark' | 'highContrast';

export const themes: Record<ThemeMode, Theme> = {
  normal: normalTheme,
  dark: darkTheme,
  highContrast: highContrastTheme,
};
