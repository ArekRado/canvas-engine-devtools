import { Entity, getEntity } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { Layers, Trash } from 'react-feather';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { ModalContext } from '../context/modal';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Vector } from './common/Vector';
import { ComponentList } from './ComponentList';
import { CreateComponent } from './CreateComponent';

export const EntityDetails: React.FC = () => {
  const { selectedEntityId } = useContext(EditorContext);
  const modalState = useContext(ModalContext);
  const appState = useContext(AppContext);

  if (!selectedEntityId) {
    return <div>Entity not selected</div>;
  }

  const selectedEntity = getEntity({
    state: appState,
    entityId: selectedEntityId,
  });

  if (!selectedEntity) {
    return <div>Entity not selected</div>;
  }

  const setEntityData = (data: Partial<Entity>): void =>
    appState.dispatch({
      type: 'SetEntity',
      payload: {
        ...selectedEntity,
        ...data,
      },
    });

  const entityParent = selectedEntity.parentId
    ? getEntity({
        state: appState,
        entityId: selectedEntity.parentId,
      })
    : null;

  return (
    <div className="w-full px-1 py-2">
      <div className="flex justify-between mb-2">
        <Input
          name="name"
          id="name"
          value={selectedEntity.name}
          onChange={(e) =>
            setEntityData({ name: e.target.value })
          }
        />

        <Button
          title="Create blueprint"
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'createBlueprint',
                isOpen: true,
                data: {
                  entity: selectedEntity,
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

      <Vector
        label={selectedEntity.parentId ? 'fromParentPosition' : 'position'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="position"
        name="position"
        value={
          selectedEntity.parentId
            ? selectedEntity.fromParentPosition
            : selectedEntity.position
        }
        onChange={(value) =>
          selectedEntity.parentId
            ? setEntityData({ fromParentPosition: value })
            : setEntityData({ position: value })
        }
      />

      <Input
        label={selectedEntity.parentId ? 'fromParentRotation' : 'rotation'}
        name={selectedEntity.parentId ? 'fromParentRotation' : 'rotation'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="rotation"
        type="number"
        value={
          selectedEntity.parentId
            ? selectedEntity.fromParentRotation
            : selectedEntity.rotation
        }
        onChange={(e) =>
          selectedEntity.parentId
            ? setEntityData({
                fromParentRotation: parseFloat(e.target.value),
              })
            : setEntityData({ rotation: parseFloat(e.target.value) })
        }
      />

      <Vector
        label={selectedEntity.parentId ? 'fromParentScale' : 'scale'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="scale"
        name="scale"
        value={
          selectedEntity.parentId
            ? selectedEntity.fromParentScale
            : selectedEntity.scale
        }
        onChange={(value) =>
          selectedEntity.parentId
            ? setEntityData({ fromParentScale: value })
            : setEntityData({ scale: value })
        }
      />

      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-4"> parent</div>
        <div className="col-span-8">
          {entityParent ? entityParent.name : 'Root'}
        </div>
      </div>

      <ComponentList />
      <div className="mt-2" />
      <CreateComponent />
    </div>
  );
};
