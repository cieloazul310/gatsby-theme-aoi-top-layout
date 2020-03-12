import React from 'react';
import PropTypes from 'prop-types';
import TopLayout from './src/components/TopLayout';

export const wrapRootElement = ({ element }) => {
  const storedPaletteType = localStorage.getItem('paletteType');
  const storedUseSystemTheme = JSON.parse(localStorage.getItem('useSystemTheme'));
  return (
    <TopLayout
      storedPaletteType={storedPaletteType}
      storedUseSystemTheme={storedUseSystemTheme}
    >
      {element}
    </TopLayout>
  );
};

wrapRootElement.propTypes = {
  element: PropTypes.node
};
