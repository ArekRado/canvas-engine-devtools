import {
  Component,
  InternalInitialState,
  Guid,
  componentName,
} from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { EditorContext } from '../../../context/editor';
import { useAppState } from '../../hooks/useAppState';
import { preStyle } from './componentList.css';
import { ComponentWrapper } from './entityComponent/ComponentWrapper';

type EntityComponent = {
  name: string;
  list: Component<any>[];
};

const getEntityComponents = (
  appState: InternalInitialState,
  selectedEntity?: Guid
): EntityComponent[] =>
  Object.entries(appState.component).map(([componentName, components]) => ({
    name: componentName,
    list: Object.values<Component<any>>(components).filter(
      (component) => component.entity === selectedEntity
    ),
  }));

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useAppState();

  const entityComponents = appState
    ? getEntityComponents(appState, editorState?.selectedEntity)
    : undefined;

  return (
    <>
      {entityComponents
        ?.sort((a, b) =>
          a.name === componentName.transform ? -1 : a.name > b.name ? -1 : 1
        )
        ?.map(({ name, list }) => {
          const RegisteredComponent = editorState.components[name];

          return list.map((component) => (
            <ComponentWrapper
              component={component}
              componentName={name}
              key={component.entity}
            >
              {RegisteredComponent ? (
                <RegisteredComponent.render component={component} />
              ) : (
                <div>
                  <div>Component "${name}" is not registered in devtools</div>
                  <pre className={preStyle}>
                    {JSON.stringify(component, null, 2)}
                  </pre>
                </div>
              )}
            </ComponentWrapper>
          ));
        })}
    </>
  );
};
