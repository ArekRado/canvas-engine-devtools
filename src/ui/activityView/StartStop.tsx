import React, { useContext } from 'react';
import { EditorContext } from '../../context/editor';
import { Button } from '../common/Button';
import { useAppState } from '../hooks/useAppState';

export const StartStop: React.FC = () => {
  const appState = useAppState();
  const editorState = useContext(EditorContext);

  return (
    <Button
      title={editorState.isPlaying ? 'Stop' : 'Start'}
      onClick={() =>
        appState &&
        editorState.dispatch({
          type: 'SetIsPlaying',
          payload: {
            state: appState,
            isPlaying: !editorState.isPlaying,
          },
        })
      }
    >
      {editorState.isPlaying ? '<Pause size={24} />' : '<Play size={24} />'}
    </Button>
  );
};
