import { InternalInitialState } from '@arekrado/canvas-engine';
import { useEffect, useState } from 'react';
import { eventBusOn, eventBusRemove } from '../../util/eventBus';

let stateCache: InternalInitialState | undefined = undefined;

export const useAppState = () => {
  const [gameState, setGameState] = useState<InternalInitialState | undefined>(undefined);

  useEffect(() => {
    const callback = (state?: InternalInitialState) => {
      if (state) {
        stateCache = state;
        setGameState(state);
      }
    };
    eventBusOn('setEditorState', callback);

    return () => {
      eventBusRemove('setEditorState', callback);
    };
  }, []);

  return gameState || stateCache;
};
