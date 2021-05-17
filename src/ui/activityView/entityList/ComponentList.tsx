import {
  componentName,
  defaultData,
  Dictionary,
  generateEntity,
  Guid,
  State,
  Component,
} from '@arekrado/canvas-engine';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../context/app';
import { EditorContext } from '../../../context/editor';
import { ComponentWrapper } from '../../entityComponent/ComponentWrapper';
import tileCenter from '../../example/asset/tile-center.png'

type EntityComponent = {
  name: string;
  list: Component<any>[];
};

const getEntityComponents = (
  appState: State,
  selectedEntityId?: Guid
): EntityComponent[] =>
  Object.entries(appState.component).map(([componentName, components]) => ({
    name: componentName,
    list: Object.values<Component<Dictionary<any>>>(components).filter(
      (component) => component.entityId === selectedEntityId
    ),
  }));

export const ComponentList: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const entityComponents = getEntityComponents(
    appState,
    editorState?.selectedEntityId
  );

  useEffect(() => {
    import('../../entityComponent/Sprite').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.sprite,
          render: component.Sprite,
          defaultData: defaultData.sprite({
            entityId: generateEntity('').id,
            src: tileCenter,
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

    import('../../entityComponent/Animation').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.animation,
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

    import('../../entityComponent/MouseInteraction').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.mouseInteraction,
          render: component.MouseInteraction,
          defaultData: defaultData.mouseInteraction({
            entityId: generateEntity('').id,
          }),
          animatedProperties: [],
        },
      });
    });

    import('../../entityComponent/CollideBox').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideBox,
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

    import('../../entityComponent/CollideCircle').then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideCircle,
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

  //   import('./Camera').then((component) => {
  //     editorState.dispatch({
  //       type: 'RegisterComponent',
  //       payload: {
  //         name: componentName.camera,
  //         render: component.Camera,
  //         defaultData: defaultData.collideCircle({
  //           entityId: generateEntity('').id,
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
