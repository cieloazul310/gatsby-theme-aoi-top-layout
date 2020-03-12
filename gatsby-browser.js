import React from 'react';
import PropTypes from 'prop-types';
import TopLayout from './TopLayout';
//import useLocalStorage from '../../src/utils/useLocalStorage';

export const wrapRootElement = ({ element }) => {
  const storedPaletteType = localStorage.getItem('paletteType');
  const storedUseSystemTheme = localStorage.getItem('useSystemTheme');
  return (
    <TopLayout storedPaletteType={storedPaletteType} storedUseSystemTheme={storedUseSystemTheme}>
      {element}
    </TopLayout>
  );
};

wrapRootElement.propTypes = {
  element: PropTypes.node
};
