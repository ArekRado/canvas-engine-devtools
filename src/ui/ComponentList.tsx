import { Component } from '@arekrado/canvas-engine/dist/component';
import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';

type EntityComponent = {
  name: string;
  list: Component<any>[];
};

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const entityComponents: EntityComponent[] = Object.entries(
    appState.component
  ).map(([componentName, components]) => ({
    name: componentName,
    list: Object.values(components).filter(
      (component: Component<any>) =>
        component.entity === editorState.selectedEntity
    ),
  }));

  return (
    <>
      <div className="text-white mb-3"> Components: </div>
      {entityComponents.map(({ name, list }) => {
        const registeredComponent = editorState.components[name];

        return list.map((component) => (
          <div key={`${component.entity}${component.name}`}>
            {registeredComponent
              ? registeredComponent(component)
              : `Component "${name}" is not registered in devtools`}
          </div>
        ));
      })}
    </>
  );
};
