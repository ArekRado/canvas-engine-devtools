import { getEntity, Entity, State } from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';

type Branch = {
  entity: Entity;
  children: Branch[];
};

type GenerateTree = (state: State, entity?: Entity) => Branch[];
export const generateTree: GenerateTree = (state, entity) =>
  Object.values(state.entity)
    .filter((t) => t.parentId === entity?.id)
    .map((t) => {
      const tEntity = getEntity({ state, entityId: t.id });

      if (!tEntity) {
        throw new Error(`Entity ${t.id} doesn't exist`);
      }

      return {
        entity: tEntity,
        children: generateTree(state, tEntity),
      };
    });

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
          focused={editorState?.selectedEntityId === entity.id}
          onClick={() =>
            editorState.dispatch({
              type: 'SetEntityId',
              payload: entity.id,
            })
          }
          className={`text-left flex-1 p-0 ${
            editorState?.hoveredEntityId === entity.id ? 'border border-white' : ''
          }`}
        >
          {/* firefox doesn't support button drag */}
          <div className="w-full h-full">{entity.name}</div>
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
      appState.dispatch({
        type: 'SetEntity',
        payload: {
          ...dragedEntity,
          parentId: entity.id,
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

  const tree = generateTree(appState);

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
