import {
  getEntity,
  Entity,
  InternalInitialState,
  getComponent,
  Transform,
  componentName,
} from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { EditorContext } from '../../../context/editor';
import { Button } from '../../common/Button';
import { sprinkles, text1 } from '../../util.css';
import { useAppState } from '../../hooks/useAppState';
import { CreateEntity } from './CreateEntity';
import { EntityDetails } from './EntityDetails';
import {
  container,
  entitiesContainer,
  entityDetailsContainer,
  entityHasChildrenStyle,
  entityIsFocusedStyle,
  listContainer,
  overEntityStyle,
} from './entityList.css';
import { registerEntityListComponents } from '../../hooks/registerEntityListComponents';

type Branch = {
  entity: Entity;
  children: Branch[];
};

type GenerateTree = (state: InternalInitialState, entity?: Entity) => Branch[];
export const generateTree: GenerateTree = (state, entity) => {
  const transform = entity
    ? getComponent<Transform>({
        state,
        entity,
        name: componentName.transform,
      })
    : undefined;

  return Object.values(state.entity)
    .filter((e) => (transform ? transform.parentId === entity : !entity))
    .map((e) => {
      const tEntity = getEntity({ state, entity: e });

      if (!tEntity) {
        throw new Error(`Entity ${e} doesn't exist`);
      }

      return {
        entity: tEntity,
        children: generateTree(state, tEntity),
      };
    });
};

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
        ${
          overEntity === entity || editorState?.hoveredEntity === entity
            ? overEntityStyle
            : ''
        } 
        ${!hasChildren ? entityHasChildrenStyle : ''} 
        ${isFocused ? entityIsFocusedStyle : ''}
      `}
    >
      <div className={sprinkles({ display: 'flex' })}>
        {hasChildren && (
          <Button
            focused={isFocused}
            onClick={() => setIsOpened(!isOpened)}
            variants={{
              type: 'transparent',
            }}
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
          className={sprinkles({
            textAlign: 'left',
            flex: '1',
          })}
          variants={{
            type: 'transparent',
          }}
        >
          {/* firefox doesn't support button drag */}
          <div className={sprinkles({ width: '100%', height: '100%' })}>
            {entity}
          </div>
        </Button>
      </div>

      <div
        className={sprinkles({
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '8x',
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
  registerEntityListComponents();

  const [dragedEntity, setDragedEntity] = useState<Entity | null>(null);
  const [overEntity, setOverEntity] = useState<Entity | null>(null);

  const handleDragOver =
    (entity: Entity) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOverEntity(entity);
    };

  const handleDrop =
    (entity: Entity) => (e: React.DragEvent<HTMLDivElement>) => {
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

  const handleDragStart =
    (entity: Entity) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();

      setDragedEntity(entity);
    };

  const tree = appState ? generateTree(appState) : [];

  return (
    <div className={container}>
      <div className={entitiesContainer}>
        {/* <CreateEntity /> */}
        <div
          className={sprinkles({
            marginBottom: '8x',
            color: 'white',
          })}
        >
          Entities
        </div>
        <div className={listContainer}>
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
        </div>
      </div>

      <div className={entityDetailsContainer}>
        <EntityDetails />
      </div>
    </div>
  );
};
