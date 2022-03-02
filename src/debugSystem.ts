import {
  systemPriority,
  createSystem,
  AnyState,
  ECSEvent,
  createGetSetForUniqComponent,
  createComponent,
  setEntity,
  emitEvent,
  addEventHandler,
  EventHandler,
  InternalInitialState,
} from '@arekrado/canvas-engine';
import React from 'react';
import ReactDOM from 'react-dom';
import { Debug } from './type';
import { App } from './ui/App';
import { eventBusDispatch } from './util/eventBus';

export const debugEntity = 'debug';
export const debugName = 'debug';

export namespace DebugEvent {
  export enum Type {
    play = 'DebugEvent-play',
    periodicallySetEditorState = 'DebugEvent-periodicallySetEditorState',
  }
  export type All = PlayEvent | PeriodicallySetEditorState;

  export type PlayEvent = ECSEvent<Type.play, undefined>;
  export type PeriodicallySetEditorState = ECSEvent<
    Type.periodicallySetEditorState,
    undefined
  >;
}

const syncStateEvent: DebugEvent.PeriodicallySetEditorState = {
  type: DebugEvent.Type.periodicallySetEditorState,
  payload: undefined,
};

const debugEventHandler: EventHandler<DebugEvent.All, InternalInitialState> = ({
  state,
  event,
}) => {
  switch (event.type) {
    case DebugEvent.Type.periodicallySetEditorState:
      eventBusDispatch('setEditorState', state);
      setTimeout(() => emitEvent(syncStateEvent), 500);

      return state;
  }

  return state;
};

const debugGetSet = createGetSetForUniqComponent<Debug, AnyState>({
  entity: debugEntity,
  name: debugName,
});

export const getDebug = debugGetSet.getComponent;
export const setDebug = debugGetSet.setComponent;

export const debugSystem = (state: AnyState, containerId: string): AnyState => {
  addEventHandler(debugEventHandler);

  state = createSystem<Debug>({
    name: debugName,
    componentName: debugName,
    priority: systemPriority.time + 1,
    state,
    create: ({ state }) => {
      ReactDOM.render(
        React.createElement(App, {}, null),
        document.getElementById(containerId),
        () => setTimeout(() => emitEvent(syncStateEvent), 100)
      );

      return state;
    },
    tick: ({ state, component }) => {
      if (component.isPlaying) {
      }
      //   if (mutableState.isUIInitialized) {
      //     if (!component.isInitialized && mutableState.isUIInitialized) {
      //       eventBusDispatch('setEditorState', state);
      //       state = setDebug({
      //         state,
      //         data: {
      //           isInitialized: true,
      //         },
      //       });

      //       return setTime({
      //         ...initialState.time,
      //         timeNow: performance.now(),
      //         previousTimeNow: performance.now(),
      //       });
      //     } else {
      //       if (mutableState.isPlaying) {
      //         eventBusDispatch('setEditorState', state);
      //         return state;
      //       } else {
      //         return {
      //           ...mutableState.state,
      //           component: {
      //             ...mutableState.state.component,
      //             sprite: mutableState.state.component.sprite,
      //           },
      //           isInitialized: true,
      //           time: {
      //             ...initialState.time,
      //             timeNow: performance.now(),
      //             previousTimeNow: performance.now(),
      //           },
      //         };
      //       }
      //     }
      //   }
      return state;
    },
  });

  state = setEntity({ state, entity: debugEntity });
  return createComponent<Debug>({
    state,
    data: {
      entity: debugEntity,
      name: debugName,
      isPlaying: false,
    },
  });
};

