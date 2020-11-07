import { initialState, State } from '@arekrado/canvas-engine';

type SyncDirection = 'Game' | 'Editor';

type MutableState = {
  stateForGame?: State;
  stateForEditor?: State;
};

const mutableState: MutableState = {
  stateForGame: initialState,
  stateForEditor: initialState,
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

  return undefined
};

export const getStateFromLocalStorage = () => {
  const item = localStorage.getItem('state');

  if (item) {
    return JSON.parse(item);
  }

  return undefined;
};

export const saveStateInLocalStorage = (state: State) => {
  localStorage.setItem('state', JSON.stringify(state));
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
    if (state.time.delta !== 0) {
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
