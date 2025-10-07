import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type Theme, ThemeProvider } from '@mui/material/styles';
import { themes, type ThemeMode } from '../theme/themes';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
    return savedTheme || 'normal';
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
    
    // Apply theme to document for CSS custom properties
    document.documentElement.setAttribute('data-theme', mode);
  };

  const toggleTheme = () => {
    const themes: ThemeMode[] = ['normal', 'dark', 'highContrast'];
    const currentIndex = themes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeMode(themes[nextIndex]);
  };

  useEffect(() => {
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', themeMode);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('themeMode')) {
        setThemeMode(e.matches ? 'dark' : 'normal');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  const theme = themes[themeMode];

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export the context for use in hooks
export { ThemeContext };
