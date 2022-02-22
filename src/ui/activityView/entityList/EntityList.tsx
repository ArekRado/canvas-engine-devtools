import {
  getEntity,
  Entity,
  InternalInitialState,
} from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { AppContext } from '../../../context/app';
import { EditorContext } from '../../../context/editor';
import { Button } from '../../common/Button';
import { sprinkles, text1 } from '../../util.css';
import { useAppState } from '../../hooks/useAppState';
import { CreateEntity } from './CreateEntity';
import { EntityDetails } from './EntityDetails';
import { container, listContainer } from './entityList.css';

type Branch = {
  entity: Entity;
  children: Branch[];
};

type GenerateTree = (state: InternalInitialState, entity?: Entity) => Branch[];
export const generateTree: GenerateTree = (state, entity) =>
  Object.values(state.component.transform)
    .filter((t) => t.parentId === entity)
    .map((t) => {
      const tEntity = getEntity({ state, entity: t.entity });

      if (!tEntity) {
        throw new Error(`Entity ${t} doesn't exist`);
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

  const isFocused = editorState?.selectedEntity === entity;
  const hasChildren = childrens.length > 0;

  return (
    <div
      draggable={true}
      onDrop={handleDrop(entity)}
      onDragOver={handleDragOver(entity)}
      onDragStart={handleDragStart(entity)}
      className={`
        ${overEntity === entity ? 'border border-blue-100' : ''}
        ${!hasChildren ? 'pl-3' : ''}
        ${isFocused ? 'border-l-2 border-blue-100' : ''}
      `}
    >
      <div className={sprinkles({ display: 'flex' })}>
        {hasChildren && (
          <Button
            focused={isFocused}
            className="px-0"
            onClick={() => setIsOpened(!isOpened)}
          >
            {isOpened ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </Button>
        )}

        <Button
          title={entity}
          focused={isFocused}
          onClick={() =>
            editorState.dispatch({
              type: 'SetSelectedEntity',
              payload: entity,
            })
          }
          className={`text-left flex-1 p-0 ${
            editorState?.hoveredEntity === entity ? 'border border-white' : ''
          }`}
        >
          {/* firefox doesn't support button drag */}
          <div className="w-full h-full">{entity}</div>
        </Button>
      </div>

      {/* <div className="ml-2 flex flex-col"> */}
      <div
        className={sprinkles({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {isOpened &&
          childrens.map((branch) => (
            <EntityButton
              key={branch.entity}
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

export const EntityListName = 'EntityList';

export const EntityList: React.FC = () => {
  const appState = useAppState();

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

    // if (dragedEntity && dragedEntity !== entity) {
    //   appState.dispatch({
    //     type: 'SetTransform',
    //     payload: {
    //       ...dragedEntity,
    //       parent: entity,
    //     },
    //   });
    // }
  };

  const handleDragStart = (entity: Entity) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    setDragedEntity(entity);
  };

  const tree = appState ? generateTree(appState) : [];

  return (
    <div className={container}>
      <CreateEntity />
      <div className={text1}>Entity:</div>
      <div className={listContainer}>
        {/* <div className="flex flex-col flex-1 overflow-y-auto mt-2"> */}
        {tree.map((branch) => (
          <EntityButton
            entity={branch.entity}
            overEntity={overEntity}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            key={branch.entity}
            childrens={branch.children}
          />
        ))}
        {/* </div> */}

        {/* <Fps /> */}
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <EntityDetails />
      </div>
    </div>
  );
};
