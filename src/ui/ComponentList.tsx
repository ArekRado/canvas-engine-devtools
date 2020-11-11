import { State } from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine/dist/component';
import { Guid } from '@arekrado/canvas-engine/dist/util/uuid';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { ComponentWrapper } from './component/ComponentWrapper';

type EntityComponent = {
  name: string;
  list: Component<any>[];
};

const getEntityComponents = (
  appState: State,
  selectedEntity: Guid
): EntityComponent[] =>
  Object.entries(appState.component).map(([componentName, components]) => ({
    name: componentName,
    list: Object.values(components).filter(
      (component: Component<any>) => component.entity === selectedEntity
    ),
  }));

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const entityComponents = getEntityComponents(
    appState,
    editorState.selectedEntity
  );

  // https://github.com/formium/tsdx/pull/367
  useEffect(() => {
    import('./component/Transform').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'transform',
          render: component.Transform,
        },
      });
    });
    import('./component/Sprite').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'sprite',
          render: component.Sprite,
        },
      });
    });
  }, []);

  return (
    <>
      <div className="text-white mb-3"> Components: </div>
      {entityComponents.map(({ name, list }) => {
        const RegisteredComponent = editorState.components[name];

        return list.map((component) => (
          <ComponentWrapper
            component={component}
            componentName={name}
            key={`${component.entity}${component.name}`}
          >
            {RegisteredComponent ? (
              // ? RegisteredComponent({ component: component })
              <RegisteredComponent component={component} />
            ) : (
              `Component "${name}" is not registered in devtools`
            )}
          </ComponentWrapper>
        ));
      })}
    </>
  );
};
