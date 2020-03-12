import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeDispatchContext } from '../../src/utils/ThemeDispatchContext';
import { themeReducer } from '../../src/utils/themeReducer';
//import useLocalStorage from '../../src/utils/useLocalStorage';
import TopThemeProvider from './TopThemeProvider';
import AppStateProvider from './AppStateProvider';

/**
 * TODO:
 * 1. Do localStorage have ['paletteType', 'useSystemTheme'] ?
 * 2. Do your system like dark mode?
 * 3. initial value ( 'light', false )
 * localStorage > prefersDarkMode > initialValue
 */
export default function TopLayout({ children, storedPaletteType, storedUseSystemTheme }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, themeDispatch] = React.useReducer(themeReducer, {
    darkMode: storedPaletteType === 'dark',
    useSystemTheme: storedUseSystemTheme || false
  });
  const { darkMode, useSystemTheme } = themeState;
  const paletteType = useSystemTheme ? (prefersDarkMode ? 'dark' : 'light') : darkMode ? 'dark' : 'light';

  // persist paletteType
  React.useEffect(() => {
    localStorage.setItem('paletteType', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  React.useEffect(() => {
    localStorage.setItem('useSystemTheme', JSON.stringify(useSystemTheme));
  }, [useSystemTheme]);

  return (
    <TopThemeProvider paletteType={paletteType}>
      <ThemeDispatchContext.Provider value={{ state: themeState, dispatch: themeDispatch }}>
        <AppStateProvider>{children}</AppStateProvider>
      </ThemeDispatchContext.Provider>
    </TopThemeProvider>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node.isRequired,
  storedPaletteType: PropTypes.string.isRequired,
  storedUseSystemTheme: PropTypes.bool.isRequired
};
