import {
  systemPriority,
  createSystem,
  AnyState,
  ECSEvent,
  createGetSetForUniqComponent,
  setComponent,
  createComponent,
  setEntity,
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
  }
  export type All = PlayEvent;
  //   | PlayerClickEvent
  //   | CleanSceneEvent
  //   | ChangePlayersEvent
  //   | ChangeDifficultyEvent
  //   | ChangeQuickStartEvent
  //   | ChangeColorBlindModeEvent
  //   | ChangeMapTypeEvent
  //   | ShowNewVersionEvent
  //   | ReloadEvent
  //   | PlayAgainCustomLevelEvent
  //   | ShakeAiBoxesEvent;

  export type PlayEvent = ECSEvent<Type.play, undefined>;

  // export type PlayAgainCustomLevelEvent = ECSEvent<
  //   Type.playAgainCustomLevel,
  //   {}
  // >;
  // export type ShakeAiBoxesEvent = ECSEvent<
  //   Type.shakeAiBoxes,
  //   { ai: AI; moves: number }
  // >;
  // export type PlayerClickEvent = ECSEvent<
  //   Type.playerClick,
  //   { boxEntity: Entity }
  // >;
  // export type CleanSceneEvent = ECSEvent<Type.cleanScene, { newPage: Page }>;
  // export type ChangePlayersEvent = ECSEvent<Type.changePlayers, {}>;
  // export type ChangeDifficultyEvent = ECSEvent<Type.changeDifficulty, {}>;
  // export type ChangeQuickStartEvent = ECSEvent<Type.changeQuickStart, {}>;
  // export type ChangeColorBlindModeEvent = ECSEvent<
  //   Type.changeColorBlindMode,
  //   {}
  // >;
  // export type ChangeMapTypeEvent = ECSEvent<Type.changeMapType, {}>;
  // export type ShowNewVersionEvent = ECSEvent<Type.showNewVersion, {}>;
  // export type ReloadEvent = ECSEvent<Type.reload, {}>;
}

const debugGetSet = createGetSetForUniqComponent<Debug, AnyState>({
  entity: debugEntity,
  name: debugName,
});

export const getDebug = debugGetSet.getComponent;
export const setDebug = debugGetSet.setComponent;

export const debugSystem = (state: AnyState, containerId: string): AnyState => {
  state = createSystem<Debug>({
    name: debugName,
    componentName: debugName,
    priority: systemPriority.time + 1,
    state,
    create: ({ state }) => {
      ReactDOM.render(
        React.createElement(App, {}, null),
        document.getElementById(containerId),
        () => setTimeout(() => eventBusDispatch('setEditorState', state), 100)
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
