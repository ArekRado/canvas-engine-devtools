import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { EditorContext } from '../../context/editor';
import { Button } from '../common/Button';

export const StartStop: React.FC = () => {
  const appState = useContext(AppContext);
  const editorState = useContext(EditorContext);

  return (
    <Button
      title={editorState.isPlaying ? 'Stop' : 'Start'}
      onClick={() =>
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
