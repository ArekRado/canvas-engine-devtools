import {
  Dictionary,
  Entity,
  Guid,
  initialState as canvasEngineInitialState,
} from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { mutableState } from '../debug';
import { Action } from '../type';
import { eventBus } from '../util/eventBus';

export type RegisterComponentPayload<Data> = {
  name: string;
  render: React.ElementType<{ component: Component<Data> }>;
  defaultData: Data;
  animatedProperties: { path: string; type: string }[];
};

export namespace EditorAction {
  export type SetEntityId = Action<'SetEntityId', Guid>;
  export type SetIsPlaying = Action<'SetIsPlaying', boolean>;
  export type RegisterComponent = Action<
    'RegisterComponent',
    RegisterComponentPayload<any>
  >;
}

type EditorActions =
  | EditorAction.SetEntityId
  | EditorAction.SetIsPlaying
  | EditorAction.RegisterComponent;

type EditorState = {
  selectedEntityId?: Guid;
  isPlaying: boolean;
  components: Dictionary<RegisterComponentPayload<any>>;
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
    case 'SetEntityId':
      return {
        ...state,
        selectedEntityId: action.payload,
      };
    case 'SetIsPlaying':
      eventBus.dispatch('setGameState', {
        ...state,
        time: canvasEngineInitialState.time,
      });

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
            [componentName]: action.payload,
          },
        };
      }

      return state;
    default:
      return state;
  }
};
