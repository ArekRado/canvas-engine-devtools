import {
  systemPriority,
  createSystem,
  AnyState,
  ECSEvent,
  createComponent,
  emitEvent,
  addEventHandler,
  EventHandler,
  createEntity,
  updateComponent,
  CanvasEngineEvent,
  getComponent,
  AllEvents,
} from '@arekrado/canvas-engine';
import React from 'react';
import ReactDOM from 'react-dom';
import { debugComponentName } from '../../debugComponentName';
import { Debug } from '../../type';
import { App } from '../../ui/App';
import { eventBusDispatch } from '../../util/eventBus';
import {
  colliderContourSystem,
  syncColliderContoursWithColliders,
} from '../colliderContour/colliderContour';
import {
  rigidBodyContourSystem,
  syncRigidBodyContoursWithRigidBodies,
} from '../rigidBodyContour/rigidBodyContour';

export const debugEntity = 'debug';

export namespace DebugEvent {
  export enum Type {
    play = 'DebugEvent-play',
    periodicallySetEditorState = 'DebugEvent-periodicallySetEditorState',
    setStateFromEditor = 'DebugEvent-setStateFromEditor',
  }
  export type All = PlayEvent | PeriodicallySetEditorState | SetStateFromEditor;

  export type PlayEvent = ECSEvent<Type.play, boolean>;
  export type PeriodicallySetEditorState = ECSEvent<
    Type.periodicallySetEditorState,
    undefined
  >;
  export type SetStateFromEditor = ECSEvent<Type.setStateFromEditor, AnyState>;
}

const syncStateEvent: DebugEvent.PeriodicallySetEditorState = {
  type: DebugEvent.Type.periodicallySetEditorState,
  payload: undefined,
};

let enablePeriodicallySetEditorStateTimeout = false;
let stateCopy: AnyState | null = null;

const debugEventHandler: EventHandler<DebugEvent.All | AllEvents, AnyState> = ({
  state,
  event,
}) => {
  const debug = getComponent<Debug>({
    state,
    entity: debugEntity,
    name: debugComponentName.debug,
  });

  switch (event.type) {
    case CanvasEngineEvent.renderLoopStart:
      if (debug?.isPlaying === false) {
        window.cancelAnimationFrame(state.animationFrame);
      }

      return state;

    case DebugEvent.Type.periodicallySetEditorState:
      state = syncColliderContoursWithColliders({ state });
      state = syncRigidBodyContoursWithRigidBodies({ state });

      eventBusDispatch('setEditorState', state);
      setTimeout(() => {
        if (debug?.isPlaying === true) {
          emitEvent(syncStateEvent);
        }
      }, 100);

      return state;

    case DebugEvent.Type.play:
      const isPlaying = event.payload;
      enablePeriodicallySetEditorStateTimeout = isPlaying;

      state = updateComponent<Debug>({
        state,
        entity: debugEntity,
        name: debugComponentName.debug,
        update: () => ({
          isPlaying,
        }),
      });

      if (isPlaying) {
        stateCopy = null;
        emitEvent(syncStateEvent);
      } else {
        stateCopy = { ...state };
      }

      eventBusDispatch('setEditorState', state);

      return state;

    case DebugEvent.Type.setStateFromEditor:
      stateCopy = { ...event.payload };
      return stateCopy;
  }

  return state;
};

export const debugSystem = ({
  state,
  containerId,
}: {
  state: AnyState;
  containerId: string;
}): AnyState => {
  addEventHandler(debugEventHandler);

  state = colliderContourSystem(state);
  state = rigidBodyContourSystem(state);

  state = createSystem<Debug>({
    name: debugComponentName.debug,
    componentName: debugComponentName.debug,
    priority: systemPriority.time + 1,
    state,
    create: ({ state }) => {
      // import('./ui/App').then(({ App }) => {
      ReactDOM.render(
        React.createElement(App, {}, null),
        document.getElementById(containerId),
        () => setTimeout(() => emitEvent(syncStateEvent), 100)
      );
      // });

      return state;
    },
    fixedTick: ({ state }) => {
      const debug = getComponent<Debug>({
        state,
        entity: debugEntity,
        name: debugComponentName.debug,
      });

      if (stateCopy !== null && debug?.isPlaying === false) {
        return stateCopy;
      }

      return state;
    },
  });

  state = createEntity({ state, entity: debugEntity });
  return createComponent<Debug>({
    state,
    entity: debugEntity,
    name: debugComponentName.debug,
    data: {
      isPlaying: true,
    },
  });
};
