import { emitEvent, getComponent } from '@arekrado/canvas-engine';
import React from 'react';
import { Pause, Play } from 'react-feather';
import { debugComponentName } from '../debugComponentName';
import { debugEntity, DebugEvent } from '../system/debug/debug';
import { Debug } from '../type';
import { Button } from './common/Button';
import { useAppState } from './hooks/useAppState';

export const StartStop: React.FC = () => {
  const appState = useAppState();
  // const editorState = useContext(EditorContext);

  if (!appState) {
    return null;
  }

  const debug = getComponent<Debug>({
    state: appState,
    entity: debugEntity,
    name: debugComponentName.debug,
  });

  if (!debug) {
    return null;
  }

  return (
    <Button
      title={debug.isPlaying ? 'Stop' : 'Start'}
      onClick={() => {
        emitEvent({
          type: DebugEvent.Type.play,
          payload: !debug.isPlaying,
        });
      }}
    >
      {debug.isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </Button>
  );
};
