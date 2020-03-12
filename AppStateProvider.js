import React from 'react';
import PropTypes from 'prop-types';
import AppStateContext from '../../src/utils/AppStateContext';
import reducer from '../../src/utils/reducer';
import { initialAppState } from '../../src/utils/AppState';

export default function AppStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

AppStateProvider.PropTypes = {
  children: PropTypes.node.isRequired
};
