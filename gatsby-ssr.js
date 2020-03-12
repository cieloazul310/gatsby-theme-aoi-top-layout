import React from 'react';
import PropTypes from 'prop-types';
import TopLayout from './src/components/TopLayout';

export const wrapRootElement = ({ element }) => (
  <TopLayout storedPaletteType="light" storedUseSystemTheme={false}>
    {element}
  </TopLayout>
);

wrapRootElement.propTypes = {
  element: PropTypes.node
};
