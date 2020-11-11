import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { ModalContext } from '../context/modal';
import { Button } from './common/Button';
import { X } from 'react-feather';
import { uuid } from '@arekrado/canvas-engine';

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
            focused={editorState.selectedEntity === key}
            onClick={() =>
              editorState.dispatch({
                type: 'SetEntity',
                payload: key,
              })
            }
            className="flex-1 text-left"
          >
            {uuid.humanFriendlyEntity(key)}
          </Button>
          <Button
            title="Remove entity"
            onClick={() => {
              modalState.dispatch({
                type: 'SetModal',
                payload: {
                  name: 'removeEntity',
                  isOpen: true,
                  data: {
                    entity: key,
                  },
                },
              });
            }}
          >
            <X size={12} />
          </Button>
        </div>
      ))}
    </>
  );
};
