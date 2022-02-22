import {
  setEntity,
  Entity,
  setComponent,
  CollideBox,
  CollideCircle,
  Camera,
  MouseInteraction,
  Guid,
  InternalInitialState,
  Animation,
} from '@arekrado/canvas-engine';
import { setCamera } from '@arekrado/canvas-engine/system/camera';
import { createContext, Dispatch, Reducer } from 'react';
import { Action } from '../type';

export namespace AppAction {
  export type SetState = Action<'SetState', InternalInitialState>;
  export type SetEntity = Action<'SetEntity', Entity>;
  export type CreateComponent = Action<
    'CreateComponent',
    {
      component: string;
      entity: Guid;
      defaultData: any;
    }
  >;

  export type SetCollideCircleComponent = Action<
    'SetCollideCircleComponent',
    CollideCircle
  >;
  export type SetCollideBoxComponent = Action<
    'SetCollideBoxComponent',
    CollideBox
  >;
  export type SetAnimationComponent = Action<
    'SetAnimationComponent',
    Animation.AnimationComponent
  >;
  export type SetMouseInteractionComponent = Action<
    'SetMouseInteractionComponent',
    MouseInteraction
  >;
  export type SetCamera = Action<'SetCamera', Camera>;
}

type AppActions =
  | AppAction.SetState
  | AppAction.SetEntity
  | AppAction.CreateComponent
  | AppAction.SetCollideCircleComponent
  | AppAction.SetCollideBoxComponent
  | AppAction.SetAnimationComponent
  | AppAction.SetMouseInteractionComponent
  | AppAction.SetCamera;

type AppState = InternalInitialState & {
  dispatch: Dispatch<AppActions>;
};

export const initialState: AppState = {
  entity: {},
  component: {} as InternalInitialState['component'],
  system: [],
  globalSystem: [],
  babylonjs: {},
  dispatch: () => {},
};

export const AppContext = createContext<AppState>(initialState);

export const reducer: Reducer<InternalInitialState, AppActions> = (
  state,
  action
) => {
  let newState: InternalInitialState | undefined;
  switch (action.type) {
    case 'SetState':
      newState = {
        ...state,
        ...action.payload,
      };
      break;
    case 'SetEntity':
      newState = setEntity({ state, entity: action.payload });
      break;
    case 'SetCamera':
      newState = setCamera({
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideCircleComponent':
      newState = setComponent({
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideBoxComponent':
      newState = setComponent({
        state,
        data: action.payload,
      });
      break;
    case 'SetAnimationComponent':
      newState = setComponent({
        state,
        data: action.payload,
      });
      break;
    case 'SetMouseInteractionComponent':
      newState = setComponent({
        state,
        data: action.payload,
      });
      break;
      break;
    case 'CreateComponent':
      const v1 = setComponent({
        state,
        data: {
          ...action.payload.defaultData,
          name: action.payload.component,
          entity: action.payload.entity,
        },
      });

      newState = v1;
      break;
    default:
      newState = state;
      break;
  }

  return newState || initialState;
};
