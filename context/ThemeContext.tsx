import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors as baseColors } from '@/constants/theme';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof baseColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const darkColors = {
  ...baseColors,
  primary: {
    ...baseColors.primary,
    50: '#1A2433',
    100: '#1E2A3B',
    200: '#243447',
    300: '#2A3E54',
    400: '#314861',
    500: '#38526E',
    600: '#435D7E',
    700: '#4E688E',
    800: '#59739E',
    900: '#647EAE',
  },
  neutral: {
    50: '#18181B',
    100: '#27272A',
    200: '#3F3F46',
    300: '#52525B',
    400: '#71717A',
    500: '#A1A1AA',
    600: '#D4D4D8',
    700: '#E4E4E7',
    800: '#F4F4F5',
    900: '#FAFAFA',
  },
  white: '#18181B',
  black: '#FFFFFF',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem('theme').then((savedTheme) => {
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  const colors = theme === 'light' ? baseColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}