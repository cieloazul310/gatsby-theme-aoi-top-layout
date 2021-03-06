export interface AppState {
  count: number;
}

export const initialAppState: AppState = {
  count: 0,
};

export type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET_COUNT' };

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: Math.max(state.count - 1, 0),
      };
    case 'RESET_COUNT':
      return {
        ...state,
        count: 0,
      };
    default:
      throw new Error();
  }
}
