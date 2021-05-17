import {
  Dictionary,
  Guid,
  initialState as canvasEngineInitialState,
  State,
} from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { mutableState } from '../debug';
import { Action } from '../type';
import { eventBusDispatch } from '../util/eventBus';

export type RegisterComponentPayload<Data> = {
  name: string;
  render: React.ElementType<{ component: Component<Data> }>;
  defaultData: Data;
  animatedProperties: { path: string; type: string }[];
};

export type RegisterActivityViewPayload = {
  name: string;
  tab: React.ElementType<{ isOpen: boolean }>;
  content: React.ElementType<{ isOpen: boolean }>;
};

export type SetIsPlayingPayload = {
  isPlaying: boolean;
  state: State;
};

export namespace EditorAction {
  export type SetEntityId = Action<'SetEntityId', Guid | undefined>;
  export type SetIsPlaying = Action<'SetIsPlaying', SetIsPlayingPayload>;
  export type SetHoveredEntityId = Action<
    'SetHoveredEntityId',
    Guid | undefined
  >;
  export type RegisterComponent = Action<
    'RegisterComponent',
    RegisterComponentPayload<any>
  >;
  export type RegisterActivityView = Action<
    'RegisterActivityView',
    RegisterActivityViewPayload
  >;
}

type EditorActions =
  | EditorAction.SetEntityId
  | EditorAction.SetIsPlaying
  | EditorAction.SetHoveredEntityId
  | EditorAction.RegisterComponent
  | EditorAction.RegisterActivityView;

type EditorState = {
  selectedEntityId?: Guid;
  hoveredEntityId?: Guid;
  isPlaying: boolean;
  components: Dictionary<RegisterComponentPayload<any>>;
  activityView: Dictionary<RegisterActivityViewPayload>;
  dispatch: Dispatch<EditorActions>;
};

export const initialState: EditorState = {
  isPlaying: false,
  components: {},
  activityView: {},
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
    case 'SetHoveredEntityId':
      return {
        ...state,
        hoveredEntityId: action.payload,
      };
    case 'SetIsPlaying':
      eventBusDispatch<State>('setGameState', {
        ...action.payload.state,
        time: canvasEngineInitialState.time,
      });

      mutableState.isPlaying = action.payload.isPlaying;

      return {
        ...state,
        isPlaying: action.payload.isPlaying,
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
    case 'RegisterActivityView':
      const viewName = action.payload.name;

      if (!state.activityView[viewName]) {
        return {
          ...state,
          activityView: {
            ...state.activityView,
            [viewName]: action.payload,
          },
        };
      }

      return state;
    default:
      return state;
  }
};
