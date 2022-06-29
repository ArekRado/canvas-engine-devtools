import {
  componentName,
  defaultMouseInteraction,
  defaultTransform,
  defaultCollider,
} from '@arekrado/canvas-engine';
import React, { useContext, useEffect } from 'react';
import { EditorContext } from '../../context/editor';
import { Collider } from '../activityView/entityList/entityComponent/Collider';
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
    //           entity: generateEntity(),
    //         }),
    //       },
    //     });
    //   }
    // );

    // import(
      // /* webpackChunkName: "MouseInteraction" */ '../activityView/entityList/entityComponent/MouseInteraction'
    // ).then((component) => {
      // editorState.dispatch({
      //   type: 'RegisterComponent',
      //   payload: {
      //     name: componentName.mouseInteraction,
      //     render: MouseInteraction,
      //     defaultData: defaultMouseInteraction(),
      //   },
      // });
    // });

    // import(
      // /* webpackChunkName: "CollideBox" */ '../activityView/entityList/entityComponent/CollideBox'
    // ).then((component) => {
      // editorState.dispatch({
      //   type: 'RegisterComponent',
      //   payload: {
      //     name: componentName.collider,
      //     render: Collider,
      //     defaultData: defaultCollider(),
      //   },
      // });
    // });

    // import(
      // /* webpackChunkName: "Transform" */ '../activityView/entityList/entityComponent/Transform'
    // ).then((component) => {
      // editorState.dispatch({
      //   type: 'RegisterComponent',
      //   payload: {
      //     name: componentName.transform,
      //     render: Transform,
      //     defaultData: defaultTransform(),
      //   },
      // });
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
