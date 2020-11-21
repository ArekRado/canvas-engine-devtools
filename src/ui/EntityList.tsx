import {
  component,
  Entity,
  Guid,
  State,
  Transform,
} from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { transform } from 'typescript';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

type Branch = {
  entity: Entity;
  children: Branch[];
};

type GenerateTree = (transform: Transform[], entity?: Entity) => Branch[];
export const generateTree: GenerateTree = (transform, entity) =>
  transform
    .filter((t) => t.data.parent?.id === entity?.id)
    .map((t) => ({
      entity: t.entity,
      children: generateTree(transform, t.entity),
    }));

type EntityButtonProps = {
  entity: Entity;
  parent?: Entity;
  overEntity: Entity | null;
  handleDrop: (entity: Entity) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (
    entity: Entity
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (
    entity: Entity
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
  childrens: Branch[];
};
const EntityButton: React.FC<EntityButtonProps> = ({
  entity,
  overEntity,
  handleDrop,
  handleDragOver,
  handleDragStart,
  childrens,
  parent,
}) => {
  const editorState = useContext(EditorContext);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      draggable={true}
      onDrop={handleDrop(entity)}
      onDragOver={handleDragOver(entity)}
      onDragStart={handleDragStart(entity)}
      className={`${
        overEntity?.id === entity.id ? 'border border-blue-100' : ''
      }
        ${parent ? 'ml-3' : ''}
        `}
    >
      {childrens.length > 0 && (
        <Button className="px-0" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </Button>
      )}

      <Button
        title={entity.id}
        focused={editorState?.selectedEntity?.id === entity.id}
        onClick={() =>
          editorState.dispatch({
            type: 'SetEntity',
            payload: entity,
          })
        }
        className="text-left"
      >
        {entity.name}
      </Button>

      {isOpened &&
        childrens.map((branch) => (
          <EntityButton
            key={branch.entity.id}
            entity={branch.entity}
            overEntity={overEntity}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            childrens={branch.children}
            parent={entity}
          />
        ))}
    </div>
  );
};

export const EntityList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const [dragedEntity, setDragedEntity] = useState<Entity | null>(null);
  const [overEntity, setOverEntity] = useState<Entity | null>(null);

  const handleDragOver = (entity: Entity) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOverEntity(entity);
  };

  const handleDrop = (entity: Entity) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setOverEntity(null);

    console.log({ dragedEntity: dragedEntity?.name, entity: entity.name });

    if (dragedEntity && dragedEntity.id !== entity.id) {
      const transform = component.transform.get({
        state: appState,
        entity: dragedEntity,
      });

      transform &&
        appState.dispatch({
          type: 'SetTransformComponent',
          payload: {
            ...transform,
            data: {
              ...transform.data,
              parent: entity,
            },
          },
        });
    }
  };

  const handleDragStart = (entity: Entity) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    setDragedEntity(entity);
  };

  // console.log(JSON.stringify(Object.values(appState.component.transform)));

  const tree = generateTree(Object.values(appState.component.transform));

  return (
    <>
      <div className="text-white mb-3">Entity:</div>
      {tree.map((branch) => (
        <EntityButton
          entity={branch.entity}
          overEntity={overEntity}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          key={branch.entity.id}
          childrens={branch.children}
        />
      ))}
    </>
  );
};
