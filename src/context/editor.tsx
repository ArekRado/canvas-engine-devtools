import { Dictionary, Entity } from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine/dist/component';
import { createContext, Dispatch, Reducer } from 'react';
import { mutableState } from '../debug';
import { Action } from '../type';

type ComponentPreview = React.ElementType<{ component: Component<any> }>;

export namespace EditorAction {
  export type SetEntity = Action<'SetEntity', Entity>;
  export type SetIsPlaying = Action<'SetIsPlaying', boolean>;
  export type RegisterComponent = Action<
    'RegisterComponent',
    {
      name: string;
      render: ComponentPreview;
    }
  >;
}

type EditorActions =
  | EditorAction.SetEntity
  | EditorAction.SetIsPlaying
  | EditorAction.RegisterComponent;

type EditorState = {
  selectedEntity?: Entity;
  isPlaying: boolean;
  components: Dictionary<ComponentPreview>;
  dispatch: Dispatch<EditorActions>;
};

export const initialState: EditorState = {
  isPlaying: false,
  components: {},
  dispatch: () => {},
};

export const EditorContext = createContext<EditorState>(initialState);

export const reducer: Reducer<EditorState, EditorActions> = (state, action) => {
  switch (action.type) {
    case 'SetEntity':
      return {
        ...state,
        selectedEntity: action.payload,
      };
    case 'SetIsPlaying':
      mutableState.isPlaying = action.payload;
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
