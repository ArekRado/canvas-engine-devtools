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
  isUIInitialized: boolean;
};

export const mutableState: MutableState = {
  state: initialState,
  isPlaying: false,
  isUIInitialized: false,
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

eventBusOn('setIsUIInitialized', (isUIInitialized: boolean) => {
  mutableState.isUIInitialized = isUIInitialized;
});

eventBusOn('setGameState', (state: State) => {
  mutableState.state = state;
});

export const registerDebugSystem = (state: State): State =>
  createGlobalSystem({
    name: 'debug',
    priority: systemPriority.time + 1,
    state,
    tick: ({ state }) => {
      if (mutableState.isUIInitialized) {
        if (!state.isDebugInitialized && mutableState.isUIInitialized) {
          eventBusDispatch('setEditorState', state);
          return {
            ...state,
            isDebugInitialized: true,
            time: {
              ...initialState.time,
              timeNow: performance.now(),
              previousTimeNow: performance.now(),
            },
          };
        } else {
          if (mutableState.isPlaying) {
            eventBusDispatch('setEditorState', state);
            return state;
          } else {
            return {
              ...mutableState.state,
              component: {
                ...mutableState.state.component,
                sprite: mutableState.state.component.sprite,
              },
              isDebugInitialized: true,
              time: {
                ...initialState.time,
                timeNow: performance.now(),
                previousTimeNow: performance.now(),
              },
            };
          }
        }
      }
      return state;
    },
  });
