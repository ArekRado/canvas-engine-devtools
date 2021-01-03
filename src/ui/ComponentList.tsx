import { defaultData, Entity, generateEntity, State } from '@arekrado/canvas-engine';
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
  selectedEntity?: Entity
): EntityComponent[] =>
  Object.entries(appState.component).map(([componentName, components]) => ({
    name: componentName,
    list: Object.values(components).filter(
      (component: Component<any>) => component.entity.id === selectedEntity?.id
    ),
  }));

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const entityComponents = getEntityComponents(
    appState,
    editorState?.selectedEntity
  );

  // https://github.com/formium/tsdx/pull/367
  useEffect(() => {
    // import('./component/Transform').then((component) => {
    //   editorState.dispatch({
    //     type: 'RegisterComponent',
    //     payload: {
    //       name: 'transform',
    //       render: component.Transform,
    //       defaultData: defaultData.transform({ entity: generateEntity('') }),
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
          defaultData: defaultData.sprite({ entity: generateEntity('') }),
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
          defaultData: defaultData.animation({ entity: generateEntity('') }),
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
            entity: generateEntity(''),
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
            entity: generateEntity(''),
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
            entity: generateEntity(''),
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
      <div className="text-white mb-3"> Components: </div>
      {entityComponents.map(({ name, list }) => {
        const RegisteredComponent = editorState.components[name];

        return list.map((component) => (
          <ComponentWrapper
            component={component}
            componentName={name}
            key={component.entity.id}
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
