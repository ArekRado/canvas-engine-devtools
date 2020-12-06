import React, { useContext } from 'react';
import { Layers, Trash } from 'react-feather';
import { EditorContext } from '../context/editor';
import { ModalContext } from '../context/modal';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { ComponentList } from './ComponentList';
import { CreateComponent } from './CreateComponent';

export const EntityDetails: React.FC = () => {
  const editorState = useContext(EditorContext);
  const modalState = useContext(ModalContext);

  if (!editorState.selectedEntity) {
    return <div>Entity not selected</div>;
  }

  return (
    <div className="w-full px-1 py-2">
      <div className="flex justify-between mb-2">
        <Input value={editorState.selectedEntity.name} onChange={() => {}} />
        <Button
          title="Create blueprint"
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'createBlueprint',
                isOpen: true,
                data: {
                  entity: editorState.selectedEntity,
                },
              },
            });
          }}
        >
          <Layers size={12} />
        </Button>

        <Button
          title="Remove entity"
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'confirm',
                isOpen: true,
                data: {
                  entity: '',
                },
              },
            });
          }}
        >
          <Trash size={12} />
        </Button>
      </div>

      <ComponentList />
      <div className="mt-2" />
      <CreateComponent />
    </div>
  );
};
