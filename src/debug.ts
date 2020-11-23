import {
  initialState,
  jsonToState,
  State,
  stateToJson,
} from '@arekrado/canvas-engine';

type SyncDirection = 'Game' | 'Editor';

type MutableState = {
  stateForGame?: State;
  stateForEditor?: State;
  isPlaying: boolean;
};

export const mutableState: MutableState = {
  stateForGame: initialState,
  stateForEditor: initialState,
  isPlaying: false,
};

export const set = (state: State, direction: SyncDirection): void => {
  if (direction === 'Game') {
    mutableState.stateForGame = state;
  }

  if (direction === 'Editor') {
    mutableState.stateForEditor = state;
  }
};

export const get = (direction: SyncDirection): State | undefined => {
  if (direction === 'Game') {
    return mutableState.stateForGame;
  }
  if (direction === 'Editor') {
    return mutableState.stateForEditor;
  }

  return undefined;
};

export const getStateFromLocalStorage = (): State | undefined => {
  const item = localStorage.getItem('state');

  if (item) {
    return jsonToState(item, initialState);
  }

  return undefined;
};

export const saveStateInLocalStorage = (state: State) => {
  localStorage.setItem('state', stateToJson(state));
};


type Update = (params: { state: State }) => State;
export const update: Update = ({ state }) => {
  if (!state.isDebugInitialized) {
    set(state, 'Editor');
    return {
      ...state,
      isDebugInitialized: true,
    };
  } else {
    if (mutableState.isPlaying) {
      set(state, 'Editor');
      return state;
    } else {
      const editorState = get('Game');
      return editorState
        ? {
            ...editorState,
            isDebugInitialized: true,
          }
        : state;
    }
  }
  return state;
};
