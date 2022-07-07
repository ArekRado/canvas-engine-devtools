import {
  Dictionary,
  Entity,
  getState,
  Time,
  componentName,
  InternalInitialState,
  emitEvent,
  timeEntity,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { DebugEvent } from '../system/debug/debug';
import { Action } from '../type';
import { EntityListName } from '../ui/activityView/entityList/EntityList';

export type RegisterComponentPayload<Data> = {
  name: string;
  render: React.ElementType<{ component: Data }>;
  defaultData: Data;
};

export type RegisterActivityViewPayload = {
  name: string;
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
  export type SetIsPlaying = Action<'SetIsPlaying', SetIsPlayingPayload>;
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
  | EditorAction.SetIsPlaying
  | EditorAction.SetHoveredEntity
  | EditorAction.RegisterComponent
  | EditorAction.RegisterActivityView
  | EditorAction.OpenActivityView;

type EditorState = {
  selectedEntity?: Entity;
  hoveredEntity?: Entity;
  isPlaying: boolean;
  components: Dictionary<RegisterComponentPayload<any>>;
  activityView: Dictionary<RegisterActivityViewPayload>;
  openedActivityView: string | null;
  dispatch: Dispatch<EditorActions>;
};

const timeInitial: Time = {
  // entity: timeEntity,
  // name: componentName.time,
  delta: 0,
  timeNow: 0,
  previousTimeNow: 0,
  dataOverwrite: undefined,
};

export const initialState: EditorState = {
  isPlaying: false,
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
    case 'SetIsPlaying':
      // eventBusDispatch<InternalInitialState>('setGameState', {
      //   ...action.payload.state,
      //   time: timeInitial,
      // });

      const playEvent: DebugEvent.PlayEvent = {
        type: DebugEvent.Type.play,
        payload: undefined,
      };

      emitEvent(playEvent);
      // mutableState.isPlaying = action.payload.isPlaying;

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

    case 'OpenActivityView':
      return {
        ...state,
        openedActivityView:
          action.payload === state.openedActivityView ? null : action.payload,
      };
  }

  return state;
};
