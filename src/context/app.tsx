import {
  initialState as engineInitialState,
  State,
  entity,
  Entity,
  setComponent,
  CollideBox,
  CollideCircle,
  Component,
  Sprite,
  Transform,
  Animation,
} from '@arekrado/canvas-engine';
import { createContext, Dispatch, Reducer } from 'react';
import { set as syncState } from '../debug';
import { Action } from '../type';

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

  export type SetTransformComponent = Action<
    'SetTransformComponent',
    Transform
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
    Animation
  >;
}

type AppActions =
  | AppAction.SetState
  | AppAction.SetEntity
  | AppAction.CreateComponent
  | AppAction.SetSpriteComponent
  | AppAction.SetTransformComponent
  | AppAction.SetCollideCircleComponent
  | AppAction.SetCollideBoxComponent
  | AppAction.SetAnimationComponent;

type AppState = State & {
  dispatch: Dispatch<AppActions>;
};

export const initialState: AppState = {
  ...engineInitialState,
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
      newState = {
        ...state,
        ...entity.set({ state, entity: action.payload }),
      };
      break;
    case 'SetTransformComponent':
      newState = setComponent({
        name: 'transform',
        state,
        data: action.payload,
      });
      break;
    case 'SetSpriteComponent':
      newState = setComponent({
        name: 'sprite',
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideCircleComponent':
      newState = setComponent({
        name: 'collideCircle',
        state,
        data: action.payload,
      });
      break;
    case 'SetCollideBoxComponent':
      newState = setComponent({
        name: 'collideBox',
        state,
        data: action.payload,
      });
      break;
    case 'SetAnimationComponent':
      newState = setComponent({
        name: 'animation',
        state,
        data: action.payload,
      });
      break;
    case 'CreateComponent':
      const v1 = setComponent({
        name: action.payload.component,
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

  newState && syncState(newState, 'Game');

  return newState || initialState;
};
