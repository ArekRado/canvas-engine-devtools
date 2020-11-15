import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

export const EntityList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  return (
    <>
      <div className="text-white mb-3">Entity:</div>
      {appState.entity.map((entity) => (
        <div key={entity.id} className="flex justify-between" title={entity.id}>
          <Button
            focused={editorState?.selectedEntity?.id === entity.id}
            onClick={() =>
              editorState.dispatch({
                type: 'SetEntity',
                payload: entity,
              })
            }
            className="flex-1 text-left"
          >
            {entity.name}
          </Button>
        </div>
      ))}
    </>
  );
};
