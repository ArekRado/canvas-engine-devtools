import { Dictionary } from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine/dist/component';
import { createContext, Dispatch, ReactElement, Reducer } from 'react';

type EditorState = {
  selectedEntity: string;
  isPlaying: boolean;
  components: Dictionary<(component: Component<any>) => ReactElement>;
  dispatch: Dispatch<Action<any>>;
};

type EditorActions = 'SetEntity' | 'SetIsPlaying' | 'RegisterComponent';

type Action<Payload> = {
  payload: Payload;
  type: EditorActions;
};

export const initialState: EditorState = {
  selectedEntity: '',
  isPlaying: false,
  components: {},
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
    case 'RegisterComponent':
      const componentName = action.payload.name;

      if (!state.components[componentName]) {
        return {
          ...state,
          components: {
            ...state.components,
            [componentName]: action.payload.render,
          },
        };
      }

      return state;
    default:
      return state;
  }
};
