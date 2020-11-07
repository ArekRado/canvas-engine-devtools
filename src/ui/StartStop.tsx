import React, { useContext } from 'react';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

export const StartStop: React.FC = () => {
  const editorState = useContext(EditorContext);

  return (
    <Button
      onClick={() =>
        editorState.dispatch({
          type: 'SetIsPlaying',
          payload: !editorState.isPlaying,
        })
      }
    >
      {editorState.isPlaying ? 'Stop' : 'Play'}
    </Button>
  );
};
