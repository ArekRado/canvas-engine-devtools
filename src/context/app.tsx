import {
  initialState as engineInitialState,
  State,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';

type AppState = State & {
  dispatch: Dispatch<Action<any>>;
};

type Action<Payload> = {
  payload: Payload;
  type: string;
};

export const initialState: AppState = {
  ...engineInitialState,
  dispatch: () => {},
};

export const AppContext = createContext<AppState>(initialState);

export const reducer: Reducer<State, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'SetState': 
      return action.payload
    default:
      return state;
  }
};
