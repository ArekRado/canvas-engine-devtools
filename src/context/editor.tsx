import { createContext, Dispatch, Reducer } from 'react';

type EditorState = {
  selectedEntity: string;
  isPlaying: boolean;
  dispatch: Dispatch<Action<any>>;
};

type EditorActions = 'SetEntity' | 'SetIsPlaying';

type Action<Payload> = {
  payload: Payload;
  type: EditorActions;
};

export const initialState: EditorState = {
  selectedEntity: '',
  isPlaying: false,
  dispatch: () => {},
};

export const EditorContext = createContext<EditorState>(initialState);

export const reducer: Reducer<EditorState, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'SetEntity':
      return {
        ...state,
        selectedEntity: action.payload,
      };
    case 'SetIsPlaying':
      return {
        ...state,
        isPlaying: action.payload,
      };
    default:
      return state;
  }
};
