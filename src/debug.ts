import {
  createGlobalSystem,
  initialState,
  jsonToState,
  State,
  stateToJson,
  systemPriority,
} from '@arekrado/canvas-engine';
import { eventBusDispatch, eventBusOn } from './util/eventBus';

type MutableState = {
  state: State;
  isPlaying: boolean;
};

export const mutableState: MutableState = {
  state: initialState,
  isPlaying: false,
};

export const getStateFromLocalStorage = (state: State): State | undefined => {
  const item = localStorage.getItem('state');

  if (item) {
    return jsonToState(item, state);
  }

  return undefined;
};

export const saveStateInLocalStorage = (state: State) => {
  localStorage.setItem('state', stateToJson(state));
};

eventBusOn('setGameState', (state: State) => {
  mutableState.state = state;
});

export const registerDebugSystem = (state: State): State =>
  createGlobalSystem({
    name: 'debug',
    priority: systemPriority.time + 1,
    state,
    tick: ({ state }) => {
      if (!state.isDebugInitialized) {
        eventBusDispatch('setEditorState', state);
        return {
          ...state,
          isDebugInitialized: true,
          time: initialState.time,
        };
      } else {
        if (mutableState.isPlaying) {
          eventBusDispatch('setEditorState', state);
          return state;
        } else {
          return {
            ...mutableState.state,
            isDebugInitialized: true,
            time: initialState.time,
          };
        }
      }
      return state;
    },
  });
