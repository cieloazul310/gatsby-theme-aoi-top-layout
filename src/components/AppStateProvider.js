import React from 'react';
import AppStateContext from '../utils/AppStateContext';
import reducer, { initialAppState } from '../utils/AppState';

export default function AppStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
}
