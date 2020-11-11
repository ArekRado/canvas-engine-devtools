import React, { useContext } from 'react';
import { Pause, Play } from 'react-feather';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

export const StartStop: React.FC = () => {
  const editorState = useContext(EditorContext);

  return (
    <Button
      title={editorState.isPlaying ? 'Stop' : 'Start'}
      onClick={() =>
        editorState.dispatch({
          type: 'SetIsPlaying',
          payload: !editorState.isPlaying,
        })
      }
    >
      {editorState.isPlaying ? (
        <Pause size={24} strokeWidth={1} />
      ) : (
        <Play size={24} strokeWidth={1} />
      )}
    </Button>
  );
};
