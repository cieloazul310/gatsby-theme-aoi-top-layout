import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import TopThemeProvider from './TopThemeProvider';
import AppStateProvider from './AppStateProvider';
import ThemeDispatchContext from '../utils/ThemeStateContext';
import themeReducer from '../utils/ThemeState';
import initialTheme from '../utils/theme';

export default function TopLayout({ children, storedItem, siteId }) {
  const defaultPaletteType = initialTheme.palette.mode;
  const storedPaletteType = storedItem !== null ? storedItem.paletteType : defaultPaletteType;
  const storedUseSystemTheme = storedItem !== null ? storedItem.useSystemTheme : false;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, themeDispatch] = React.useReducer(themeReducer, {
    darkMode: storedPaletteType === 'dark',
    useSystemTheme: storedUseSystemTheme || false,
  });
  const { darkMode, useSystemTheme } = themeState;
  const paletteType = useSystemTheme ? (prefersDarkMode ? 'dark' : 'light') : darkMode ? 'dark' : 'light';

  // persist paletteType
  React.useEffect(() => {
    localStorage.setItem(
      siteId,
      JSON.stringify({
        paletteType: darkMode ? 'dark' : 'light',
        useSystemTheme,
      })
    );
  }, [siteId, darkMode, useSystemTheme]);
  /**
   * once and deprecated old storage
   */
  React.useEffect(() => {
    localStorage.removeItem('paletteType');
    localStorage.removeItem('useSystemTheme');
  });

  return (
    <TopThemeProvider paletteType={paletteType}>
      <ThemeDispatchContext.Provider value={{ state: themeState, dispatch: themeDispatch }}>
        <AppStateProvider>{children}</AppStateProvider>
      </ThemeDispatchContext.Provider>
    </TopThemeProvider>
  );
}
