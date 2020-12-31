import {
  createGlobalSystem,
  initialState,
  jsonToState,
  State,
  stateToJson,
} from '@arekrado/canvas-engine';
import { eventBus } from './util/eventBus';

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

eventBus.on('setGameState', (state: State) => {
  mutableState.state = state;
});

export const registerDebugSystem = (state: State): State =>
  createGlobalSystem({
    name: 'debug',
    state,
    tick: ({ state }) => {
      if (!state.isDebugInitialized) {
        eventBus.dispatch('setEditorState', state);
        return {
          ...state,
          isDebugInitialized: true,
        };
      } else {
        if (mutableState.isPlaying) {
          eventBus.dispatch('setEditorState', state);
          return state;
        } else {
          return {
            ...mutableState.state,
            isDebugInitialized: true,
            time: {
              ...mutableState.state.time,
              delta: 0,
            },
          };
        }
      }
      return state;
    },
  });
