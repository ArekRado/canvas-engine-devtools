import {
  initialState as engineInitialState,
  State,
  setEntity,
  Entity,
  setComponent,
  CollideBox,
  CollideCircle,
  Sprite,
  Animation,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { mutableState, registerDebugSystem } from '../debug';
import { Action } from '../type';
import { eventBusDispatch } from '../util/eventBus';

export namespace AppAction {
  export type SetState = Action<'SetState', State>;
  export type SetEntity = Action<'SetEntity', Entity>;
  export type CreateComponent = Action<
    'CreateComponent',
    {
      component: string;
      entity: Entity;
      defaultData: any;
    }
  >;
  export type SetSpriteComponent = Action<'SetSpriteComponent', Sprite>;

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
    Animation
  >;
  export type SetMouseInteractionComponent = Action<
    'SetMouseInteractionComponent',
    Animation
  >;
}

type AppActions =
  | AppAction.SetState
  | AppAction.SetEntity
  | AppAction.CreateComponent
  | AppAction.SetSpriteComponent
  | AppAction.SetCollideCircleComponent
  | AppAction.SetCollideBoxComponent
  | AppAction.SetAnimationComponent
  | AppAction.SetMouseInteractionComponent;

type AppState = State & {
  dispatch: Dispatch<AppActions>;
};

export const initialState: AppState = {
  ...registerDebugSystem(engineInitialState),
  dispatch: () => {},
};

export const AppContext = createContext<AppState>(initialState);

export const reducer: Reducer<State, AppActions> = (state, action) => {
  let newState: State | undefined;
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
    case 'SetSpriteComponent':
      newState = setComponent('sprite', {
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideCircleComponent':
      newState = setComponent('collideCircle', {
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideBoxComponent':
      newState = setComponent('collideBox', {
        state,
        data: action.payload,
      });
      break;
    case 'SetAnimationComponent':
      newState = setComponent('animation', {
        state,
        data: action.payload,
      });
      break;
    case 'SetMouseInteractionComponent':
      newState = setComponent('mouseInteraction', {
        state,
        data: action.payload,
      });
      break;
    case 'CreateComponent':
      const v1 = setComponent(action.payload.component, {
        state,
        data: {
          ...action.payload.defaultData,
          entity: action.payload.entity,
        },
      });

      newState = v1;
      break;
    default:
      newState = state;
      break;
  }

  !mutableState.isPlaying &&
    newState &&
    eventBusDispatch('setGameState', newState);

  return newState || initialState;
};
