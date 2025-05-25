import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f0f2f5',
  text: '#333',
  primary: '#007bff',
  secondary: '#6c757d',
  cardBackground: '#fff',
  headerBackground: '#333',
  headerText: '#f0f0f0',
  navbarBackground: '#333',
  navbarText: 'white',
  navbarHover: '#ddd',
  buttonBackground: '#007bff',
  buttonHover: '#0056b3',
  inputBackground: '#fff',
  inputBorder: '#ddd',
  footerBackground: '#343a40',
  footerText: '#fff',
};

export const darkTheme = {
  background: '#282c34',
  text: '#e0e0e0',
  primary: '#90caf9',
  secondary: '#a0a0a0',
  cardBackground: '#333',
  headerBackground: '#1a1a1a',
  headerText: '#e0e0e0',
  navbarBackground: '#1e1e1e',
  navbarText: '#b0b0b0',
  navbarHover: '#888',
  buttonBackground: '#90caf9',
  buttonHover: '#64b5f6',
  inputBackground: '#3a3a5a',
  inputBorder: '#555',
  footerBackground: '#121212',
  footerText: '#e0e0e0',
};

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [userPrefersDark, setUserPrefersDark] = useState(null);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme !== null) {
          setUserPrefersDark(savedTheme === 'dark');
        }
      } catch (e) {
        console.error('Error loading theme preference', e);
      }
    };

    loadThemePreference();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const theme = userPrefersDark === true || (userPrefersDark === null && colorScheme === 'dark')
    ? darkTheme
    : lightTheme;

  const isDarkMode = userPrefersDark === true || (userPrefersDark === null && colorScheme === 'dark');

  const toggleTheme = async () => {
    const newPref = !isDarkMode;
    setUserPrefersDark(newPref);
    try {
      await AsyncStorage.setItem('themePreference', newPref ? 'dark' : 'light');
    } catch (e) {
      console.error('Error saving theme preference', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);