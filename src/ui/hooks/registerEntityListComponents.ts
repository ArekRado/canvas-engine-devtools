import {
  componentName,
  defaultMouseInteraction,
  defaultCollideBox,
  defaultCollideCircle,
  generateEntity,
  defaultTransform,
} from '@arekrado/canvas-engine';
import React, { useContext, useEffect } from 'react';
import { EditorContext } from '../../context/editor';
import { CollideBox } from '../activityView/entityList/entityComponent/CollideBox';
import { CollideCircle } from '../activityView/entityList/entityComponent/CollideCircle';
import { MouseInteraction } from '../activityView/entityList/entityComponent/MouseInteraction';
import { Transform } from '../activityView/entityList/entityComponent/Transform';

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

    // import(
      // /* webpackChunkName: "MouseInteraction" */ '../activityView/entityList/entityComponent/MouseInteraction'
    // ).then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.mouseInteraction,
          render: MouseInteraction,
          defaultData: defaultMouseInteraction({
            entity: generateEntity({ name: '' }),
          }),
        },
      });
    // });

    // import(
      // /* webpackChunkName: "CollideBox" */ '../activityView/entityList/entityComponent/CollideBox'
    // ).then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideBox,
          render: CollideBox,
          defaultData: defaultCollideBox({
            entity: generateEntity({ name: '' }),
          }),
        },
      });
    // });

    // import(
      // /* webpackChunkName: "CollideCircle" */ '../activityView/entityList/entityComponent/CollideCircle'
    // ).then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.collideCircle,
          render: CollideCircle,
          defaultData: defaultCollideCircle({
            entity: generateEntity({ name: '' }),
          }),
        },
      });
    // });

    // import(
      // /* webpackChunkName: "Transform" */ '../activityView/entityList/entityComponent/Transform'
    // ).then((component) => {
      editorState.dispatch({
        type: 'RegisterComponent',
        payload: {
          name: componentName.transform,
          render: Transform,
          defaultData: defaultTransform({
            entity: generateEntity({ name: '' }),
          }),
        },
      });
    // });

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
