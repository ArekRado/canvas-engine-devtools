// import { humanFriendlyEntity } from '@arekrado/canvas-engine/util/uuid';
import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { ModalContext } from '../context/modal';
import { Button } from './common/Button';

export const EntityList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);
  const modalState = useContext(ModalContext);

  return (
    <>
      <div className="text-white mb-3">Entity:</div>
      {appState.entity.map((key) => (
        <div key={key} className="flex justify-between" title={key}>
          <Button
            onClick={() =>
              editorState.dispatch({
                type: 'SetEntity',
                payload: key,
              })
            }
            className={`${
              editorState.selectedEntity === key ? 'border-dashed border-2' : ''
            } flex-1 text-left`}
          >
            {key}
            {/* {humanFriendlyEntity(key)} */}
          </Button>
          <Button
            onClick={() => {
              modalState.dispatch({
                type: 'Open',
                payload: {
                  name: 'removeEntity',
                  entity: key,
                },
              });
            }}
          >
            x
          </Button>
        </div>
      ))}
    </>
  );
};
