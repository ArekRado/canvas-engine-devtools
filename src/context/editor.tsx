import {
  Dictionary,
  Entity,
  InternalInitialState,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { Action } from '../type';

export type RegisterComponentPayload<Data> = {
  name: string;
  render: React.ElementType<{ component: Data }>;
  defaultData: Data;
};

export type RegisterActivityViewPayload = {
  name: string;
  title: string;
  tab: React.ElementType<{ isOpen: boolean }>;
  content: React.ElementType<{ isOpen: boolean }>;
  index: number;
};

export type SetIsPlayingPayload = {
  isPlaying: boolean;
  state: InternalInitialState;
};

export namespace EditorAction {
  export type SetSelectedEntity = Action<
    'SetSelectedEntity',
    Entity | undefined
  >;
  export type SetHoveredEntity = Action<'SetHoveredEntity', Entity | undefined>;
  export type RegisterComponent = Action<
    'RegisterComponent',
    RegisterComponentPayload<any>
  >;
  export type RegisterActivityView = Action<
    'RegisterActivityView',
    RegisterActivityViewPayload
  >;
  export type OpenActivityView = Action<'OpenActivityView', string>;
}

type EditorActions =
  | EditorAction.SetSelectedEntity
  | EditorAction.SetHoveredEntity
  | EditorAction.RegisterComponent
  | EditorAction.RegisterActivityView
  | EditorAction.OpenActivityView;

type EditorState = {
  selectedEntity?: Entity;
  hoveredEntity?: Entity;
  components: Dictionary<RegisterComponentPayload<any>>;
  activityView: Dictionary<RegisterActivityViewPayload>;
  openedActivityView: string | null;
  dispatch: Dispatch<EditorActions>;
};

export const initialState: EditorState = {
  components: {},
  activityView: {},
  dispatch: () => {},
  openedActivityView: 'EntityListName',
};

export const EditorContext = createContext<EditorState>(initialState);

export const reducer: Reducer<EditorState, EditorActions> = (state, action) => {
  switch (action.type) {
    case 'SetSelectedEntity':
      return {
        ...state,
        selectedEntity:
          state.selectedEntity === action.payload ? undefined : action.payload,
      };
    case 'SetHoveredEntity':
      return {
        ...state,
        hoveredEntity: action.payload,
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

    case 'OpenActivityView':
      return {
        ...state,
        openedActivityView:
          action.payload === state.openedActivityView ? null : action.payload,
      };
  }

  return state;
};
