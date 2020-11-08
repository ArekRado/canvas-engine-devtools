import {
  initialState as engineInitialState,
  State,
  entity,
  component,
} from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine/dist/component';
import { createContext, Dispatch, Reducer } from 'react';
import { set as syncState } from '../debug';

type AppActions = 'SetState' | 'SetEntity' | 'CreateComponent';

type AppState = State & {
  dispatch: Dispatch<Action<any>>;
};

type Action<Payload> = {
  payload: Payload;
  type: AppActions;
};

export const initialState: AppState = {
  ...engineInitialState,
  dispatch: () => {},
};

export const AppContext = createContext<AppState>(initialState);

export const reducer: Reducer<State, Action<any>> = (state, action) => {
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
    case 'CreateComponent':
      const componentName = action.payload
        .component as keyof State['component'];

      const componentCreator = component[componentName];

      const defaultData: Component<any> = componentCreator.defaultData({
        entity: action.payload.entity,
        name: entity.generate(componentName),
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

  syncState(newState, 'Game');

  return newState;
};
