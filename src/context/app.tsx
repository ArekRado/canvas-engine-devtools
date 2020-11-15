import {
  initialState as engineInitialState,
  State,
  entity,
  component,
  Entity,
} from '@arekrado/canvas-engine';
import {
  Component,
  Sprite,
  Transform,
} from '@arekrado/canvas-engine/dist/component';
import { createContext, Dispatch, Reducer } from 'react';
import { set as syncState } from '../debug';
import { Action } from '../type';

export namespace AppAction {
  export type SetState = Action<'SetState', State>;
  export type SetEntity = Action<'SetEntity', Entity>;
  export type CreateComponent = Action<
    'CreateComponent',
    {
      component: keyof State['component'];
      entity: Entity;
    }
  >;
  export type SetSpriteComponent = Action<'SetSpriteComponent', Sprite>;
  export type SetTransformComponent = Action<
    'SetTransformComponent',
    Transform
  >;
}

type AppActions =
  | AppAction.SetState
  | AppAction.SetEntity
  | AppAction.CreateComponent
  | AppAction.SetSpriteComponent
  | AppAction.SetTransformComponent;

type AppState = State & {
  dispatch: Dispatch<AppActions>;
};

export const initialState: AppState = {
  ...engineInitialState,
  dispatch: () => {},
};

export const AppContext = createContext<AppState>(initialState);

export const reducer: Reducer<State, AppActions> = (state, action) => {
  let newState;

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
      newState = component.transform.set({
        state,
        data: action.payload,
      });
      break;
    case 'SetSpriteComponent':
      newState = component.sprite.set({
        state,
        data: action.payload,
      });

      break;
    case 'CreateComponent':
      const componentName = action.payload
        .component as keyof State['component'];

      const componentCreator = component[componentName];

      const defaultData: Component<any> = componentCreator.defaultData({
        entity: action.payload.entity,
      });

      if (componentCreator) {
        const stateWithComponent = componentCreator.set({
          state,
          data: defaultData,
        });

        newState = {
          ...state,
          component: stateWithComponent.component,
        };
      }
      break;
    default:
      newState = state;
      break;
  }

  newState && syncState(newState, 'Game');

  return newState || initialState;
};
