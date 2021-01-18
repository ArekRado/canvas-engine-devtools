import {
  defaultData,
  Dictionary,
  generateEntity,
  Guid,
  State,
} from '@arekrado/canvas-engine';
import { Component } from '@arekrado/canvas-engine';
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
  selectedEntityId?: Guid
): EntityComponent[] =>
  Object.entries(appState.component).map(
    ([componentName, components]) => ({
      name: componentName,
      list: Object.values<Component<Dictionary<any>>>(components).filter(
        (component) => component.entityId === selectedEntityId
      ),
    })
  );

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const entityComponents = getEntityComponents(
    appState,
    editorState?.selectedEntityId
  );

  // https://github.com/formium/tsdx/pull/367
  useEffect(() => {
    // import('./component/Transform').then((component) => {
    //   editorState.dispatch({
    //     type: 'RegisterComponent',
    //     payload: {
    //       name: 'transform',
    //       render: component.Transform,
    //       defaultData: defaultData.transform({ entityId: generateEntity('').id }),
    //       animatedProperties: [
    //         { path: 'rotation', type: 'number' },
    //         { path: 'fromParentRotation', type: 'number' },
    //         { path: 'scale', type: 'Vector2D' },
    //         { path: 'fromParentScale', type: 'Vector2D' },
    //         { path: 'position', type: 'Vector2D' },
    //         { path: 'fromParentPosition', type: 'Vector2D' },
    //       ],
    //     },
    //   });
    // });

    import('./component/Sprite').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'sprite',
          render: component.Sprite,
          defaultData: defaultData.sprite({ entityId: generateEntity('').id }),
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

    import('./component/Animation').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'animation',
          render: component.Animation,
          defaultData: defaultData.animation({
            entityId: generateEntity('').id,
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

    import('./component/MouseInteraction').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'mouseInteraction',
          render: component.MouseInteraction,
          defaultData: defaultData.mouseInteraction({
            entityId: generateEntity('').id,
          }),
          animatedProperties: [],
        },
      });
    });

    import('./component/CollideBox').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'collideBox',
          render: component.CollideBox,
          defaultData: defaultData.collideBox({
            entityId: generateEntity('').id,
          }),
          animatedProperties: [
            { path: 'size', type: 'Vector2D' },
            { path: 'position', type: 'Vector2D' },
          ],
        },
      });
    });

    import('./component/CollideCircle').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: 'collideCircle',
          render: component.CollideCircle,
          defaultData: defaultData.collideCircle({
            entityId: generateEntity('').id,
          }),
          animatedProperties: [
            { path: 'radius', type: 'number' },
            { path: 'position', type: 'Vector2D' },
          ],
        },
      });
    });
  }, []);

  return (
    <>
      {entityComponents.map(({ name, list }) => {
        const RegisteredComponent = editorState.components[name];

        return list.map((component) => (
          <ComponentWrapper
            component={component}
            componentName={name}
            key={component.entityId}
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
