import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopThemeProvider from './TopThemeProvider';
import AppStateProvider from './AppStateProvider';
import ThemeDispatchContext from '../utils/ThemeStateContext';
import themeReducer from '../utils/ThemeState';

export default function TopLayout({
  children,
  storedPaletteType,
  storedUseSystemTheme
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, themeDispatch] = React.useReducer(themeReducer, {
    darkMode: storedPaletteType === 'dark',
    useSystemTheme: storedUseSystemTheme || false
  });
  const { darkMode, useSystemTheme } = themeState;
  const paletteType = useSystemTheme
    ? prefersDarkMode
      ? 'dark'
      : 'light'
    : darkMode
    ? 'dark'
    : 'light';

  // persist paletteType
  React.useEffect(() => {
    localStorage.setItem('paletteType', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  React.useEffect(() => {
    localStorage.setItem('useSystemTheme', useSystemTheme);
  }, [useSystemTheme]);

  return (
    <TopThemeProvider paletteType={paletteType}>
      <ThemeDispatchContext.Provider
        value={{ state: themeState, dispatch: themeDispatch }}
      >
        <AppStateProvider>{children}</AppStateProvider>
      </ThemeDispatchContext.Provider>
    </TopThemeProvider>
  );
}
