import {
  Dictionary,
  Guid,
  getState,
  Time,
  componentName,
  InternalInitialState,
  emitEvent,
  Component,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { DebugEvent } from '../debugSystem';
import { Action } from '../type';

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
  index: number;
};

export type SetIsPlayingPayload = {
  isPlaying: boolean;
  state: InternalInitialState;
};

export namespace EditorAction {
  export type SetSelectedEntity = Action<'SetSelectedEntity', Guid | undefined>;
  export type SetIsPlaying = Action<'SetIsPlaying', SetIsPlayingPayload>;
  export type SetHoveredEntity = Action<'SetHoveredEntity', Guid | undefined>;
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
  | EditorAction.SetSelectedEntity
  | EditorAction.SetIsPlaying
  | EditorAction.SetHoveredEntity
  | EditorAction.RegisterComponent
  | EditorAction.RegisterActivityView;

type EditorState = {
  selectedEntity?: Guid;
  hoveredEntity?: Guid;
  isPlaying: boolean;
  components: Dictionary<RegisterComponentPayload<any>>;
  activityView: Dictionary<RegisterActivityViewPayload>;
  dispatch: Dispatch<EditorActions>;
};

const timeInitial: Component<Time> = {
  entity: '',
  name: componentName.time,
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
};

export const EditorContext = createContext<EditorState>(initialState);

export const reducer: Reducer<EditorState, EditorActions> = (state, action) => {
  switch (action.type) {
    case 'SetSelectedEntity':
      return {
        ...state,
        selectedEntity: action.payload,
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
    default:
      return state;
  }
};
