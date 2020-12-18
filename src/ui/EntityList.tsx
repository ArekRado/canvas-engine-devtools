import { Entity, getComponent, Transform } from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

type Branch = {
  entity: Entity;
  children: Branch[];
};

type TreeData = {
  entity: Entity;
  parent?: Entity;
};

type GenerateTree = (transform: TreeData[], entity?: Entity) => Branch[];
export const generateTree: GenerateTree = (transform, entity) =>
  transform
    .filter((t) => t.parent?.id === entity?.id)
    .map((t) => ({
      entity: t.entity,
      children: generateTree(transform, t.entity),
    }));

type EntityButtonProps = {
  entity: Entity;
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
}) => {
  const editorState = useContext(EditorContext);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      draggable={true}
      onDrop={handleDrop(entity)}
      onDragOver={handleDragOver(entity)}
      onDragStart={handleDragStart(entity)}
      className={`
        ${overEntity?.id === entity.id ? 'border border-blue-100' : ''}
        ${childrens.length === 0 ? 'ml-3' : ''}
      `}
    >
      <div className="flex">
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
          className="text-left flex-1"
        >
          {entity.name}
        </Button>
      </div>

      <div className="ml-2 flex flex-col">
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
            />
          ))}
      </div>
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

    if (dragedEntity && dragedEntity.id !== entity.id) {
      const transform = getComponent<Transform>('transform', {
        state: appState,
        entity: dragedEntity,
      });

      transform &&
        appState.dispatch({
          type: 'SetTransformComponent',
          payload: {
            ...transform,
            parent: entity,
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

  const transformData = Object.values(appState.component.transform);

  const tree = generateTree(
    appState.entity.map(
      (entity) =>
        transformData.find((t) => t.entity.id === entity.id) || { entity }
    )
  );

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
