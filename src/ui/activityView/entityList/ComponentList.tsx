import {
  InternalInitialState,
  componentName,
  Entity,
} from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { EditorContext } from '../../../context/editor';
import { useAppState } from '../../hooks/useAppState';
import { preStyle } from './componentList.css';
import { ComponentWrapper } from './entityComponent/ComponentWrapper';

type EntityComponent = {
  name: string;
  component: Object | null;
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
          const RegisteredComponent = editorState.components[name];

          if (!component) {
            return null;
          }

          return (
            <ComponentWrapper
              componentName={name}
              key={`${selectedEntity}-${name}`}
            >
              {RegisteredComponent ? (
                <RegisteredComponent.render component={component} />
              ) : (
                <div>
                  <div>Component {name} is not registered in a devtools</div>
                  <pre className={preStyle}>
                    <code>{JSON.stringify(component, null, 2)}</code>
                  </pre>
                </div>
              )}
            </ComponentWrapper>
          );
        })}
    </>
  );
};
