import {
  componentName,
  defaultAnimation,
  defaultMouseInteraction,
  defaultCollideBox,
  defaultCollideCircle,
  generateEntity,
  defaultTransform,
} from '@arekrado/canvas-engine';
import React, { useContext, useEffect } from 'react';
import { EditorContext } from '../../context/editor';

export const registerEntityListComponents = () => {
  const editorState = useContext(EditorContext);

  useEffect(() => {
    // import('../activityView/entityList/entityComponent/Animation').then(
    //   (component) => {
    //     editorState.dispatch({
    //       type: 'RegisterComponent',
    //       payload: {
    //         name: componentName.animation,
    //         render: component.Animation,
    //         defaultData: defaultAnimation({
    //           entity: generateEntity({ name: '' }),
    //         }),
    //       },
    //     });
    //   }
    // );

    import('../activityView/entityList/entityComponent/MouseInteraction').then(
      (component) => {
        editorState.dispatch({
          type: 'RegisterComponent',
          payload: {
            name: componentName.mouseInteraction,
            render: component.MouseInteraction,
            defaultData: defaultMouseInteraction({
              entity: generateEntity({ name: '' }),
            }),
          },
        });
      }
    );

    import('../activityView/entityList/entityComponent/CollideBox').then(
      (component) => {
        editorState.dispatch({
          type: 'RegisterComponent',
          payload: {
            name: componentName.collideBox,
            render: component.CollideBox,
            defaultData: defaultCollideBox({
              entity: generateEntity({ name: '' }),
            }),
          },
        });
      }
    );

    import('../activityView/entityList/entityComponent/CollideCircle').then(
      (component) => {
        editorState.dispatch({
          type: 'RegisterComponent',
          payload: {
            name: componentName.collideCircle,
            render: component.CollideCircle,
            defaultData: defaultCollideCircle({
              entity: generateEntity({ name: '' }),
            }),
          },
        });
      }
    );

    import('../activityView/entityList/entityComponent/Transform').then(
      (component) => {
        editorState.dispatch({
          type: 'RegisterComponent',
          payload: {
            name: componentName.transform,
            render: component.Transform,
            defaultData: defaultTransform({
              entity: generateEntity({ name: '' }),
            }),
          },
        });
      }
    );

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
};
