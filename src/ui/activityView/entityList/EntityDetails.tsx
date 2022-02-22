import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { AppContext } from '../../../context/app';
import { EditorContext } from '../../../context/editor';
import { ModalContext } from '../../../context/modal';
import { Button } from '../../common/Button';
import { ComponentList } from './ComponentList';
import { CreateComponent } from './CreateComponent';

export const EntityDetails: React.FC = () => {
  const { selectedEntity } = useContext(EditorContext);
  const modalState = useContext(ModalContext);
  const appState = useContext(AppContext);

  if (!selectedEntity) {
    return <div>Entity not selected</div>;
  }

  return (
    <div className="px-1 py-2">
      <div className="flex justify-between mb-2">
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
