import {
  InternalInitialState,
  componentName,
  Entity,
  AnyState,
  updateComponent,
  emitEvent,
} from '@arekrado/canvas-engine';
import React, { useCallback, useContext } from 'react';
import { EditorContext } from '../../../context/editor';
import { debugEntity, DebugEvent } from '../../../system/debug/debug';
import { getDebug } from '../../../system/debug/debugCrud';
import { useAppState } from '../../hooks/useAppState';
import { preStyle, textareaStyle } from './componentList.css';
import { ComponentWrapper } from './ComponentWrapper';

type EntityComponent = {
  name: string;
  component: Object | null;
};

const syncComponentWithState = ({
  name,
  component,
  entity,
  state,
}: {
  name: string;
  component: any;
  entity: Entity;
  state: AnyState;
}) => {
  state = updateComponent({
    state,
    name,
    entity,
    update: () => component,
  });

  emitEvent({
    type: DebugEvent.Type.setStateFromEditor,
    payload: state,
  });
};

const getEntityComponents = (
  appState: InternalInitialState,
  selectedEntity?: Entity
): EntityComponent[] =>
  Object.entries(appState.component).map(([componentName, components]) => ({
    name: componentName,
    component: selectedEntity ? components[selectedEntity] : null,
  }));

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useAppState();
  const selectedEntity = editorState?.selectedEntity || '';

  if (!appState) {
    return null;
  }

  const debug = getDebug({
    state: appState,
    entity: debugEntity,
  });

  const entityComponents = appState
    ? getEntityComponents(appState, editorState?.selectedEntity)
    : undefined;

  return (
    <>
      {entityComponents
        ?.sort((a, b) =>
          a.name === componentName.transform ? -1 : a.name > b.name ? -1 : 1
        )
        ?.map(({ name, component }) => {
          if (!component) {
            return null;
          }

          const text = JSON.stringify(component, null, 2);

          return (
            <ComponentWrapper
              componentName={name}
              key={`${selectedEntity}-${name}`}
            >
              {debug?.isPlaying ? (
                <pre className={preStyle}>
                  <code>{text}</code>
                </pre>
              ) : (
                <textarea
                  className={textareaStyle}
                  rows={text.split(/\r?\n/).length}
                  defaultValue={text}
                  onBlur={(e) =>
                    syncComponentWithState({
                      component: JSON.parse(e.target.value),
                      name,
                      entity: selectedEntity,
                      state: appState,
                    })
                  }
                />
              )}
            </ComponentWrapper>
          );
        })}
    </>
  );
};
