import {
  componentName,
  defaultAnimation,
  defaultMouseInteraction,
  defaultCollideBox,
  defaultCollideCircle,
  generateEntity,
  Component,
  InternalInitialState,
  Guid,
} from '@arekrado/canvas-engine';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../context/app';
import { EditorContext } from '../../../context/editor';
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
  const appState = useContext(AppContext);

  const entityComponents = getEntityComponents(
    appState,
    editorState?.selectedEntity
  );

  useEffect(() => {
    import('./entityComponent/Animation').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.animation,
          render: component.Animation,
          defaultData: defaultAnimation({
            entity: generateEntity({ name: '' }),
          }),
          animatedProperties: [
            { path: 'rotation', type: 'number' },
            { path: 'fromParentRotation', type: 'number' },
            { path: 'scale', type: 'Vector2D' },
            { path: 'fromParentScale', type: 'Vector2D' },
            { path: 'position', type: 'Vector2D' },
            { path: 'fromParentPosition', type: 'Vector2D' },
          ],
        },
      });
    });

    import('./entityComponent/MouseInteraction').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.mouseInteraction,
          render: component.MouseInteraction,
          defaultData: defaultMouseInteraction({
            entity: generateEntity({ name: '' }),
          }),
          animatedProperties: [],
        },
      });
    });

    import('./entityComponent/CollideBox').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideBox,
          render: component.CollideBox,
          defaultData: defaultCollideBox({
            entity: generateEntity({ name: '' }),
          }),
          animatedProperties: [
            { path: 'size', type: 'Vector2D' },
            { path: 'position', type: 'Vector2D' },
          ],
        },
      });
    });

    import('./entityComponent/CollideCircle').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideCircle,
          render: component.CollideCircle,
          defaultData: defaultCollideCircle({
            entity: generateEntity({ name: '' }),
          }),
          animatedProperties: [
            { path: 'radius', type: 'number' },
            { path: 'position', type: 'Vector2D' },
          ],
        },
      });
    });

    //   import('./Camera').then((component) => {
    //     editorState.dispatch({
    //       type: 'RegisterComponent',
    //       payload: {
    //         name: componentName.camera,
    //         render: component.Camera,
    //         defaultData: defaultData.collideCircle({
    //           entity: generateEntity({name:''}),
    //         }),
    //         animatedProperties: [
    //           { path: 'position', type: 'Vector2D' },
    //           { path: 'zoom', type: 'number' },
    //           { path: 'pivot', type: 'Vector2D' },
    //         ],
    //       },
    //     });
    //   });
  }, []);

  return (
    <>
      {entityComponents.map(({ name, list }) => {
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
              `Component "${name}" is not registered in devtools`
            )}
          </ComponentWrapper>
        ));
      })}
    </>
  );
};
