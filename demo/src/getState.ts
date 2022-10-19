import {
  getState as getCanvaasEngineState,
  generateEntity,
  updateCamera,
  cameraEntity,
  updateRigidBody,
  updateTransform,
  updateCollider,
  createEntity,
} from '../../node_modules/@arekrado/canvas-engine';
import { State } from './type';
import { debugSystem } from '../../src/index';

import { circleBlueprint } from './circleBlueprint';
import { barrierBlueprint } from './barrierBlueprint';
import { vector } from '@arekrado/vector-2d';
import { Scene, WebGLRenderer } from '../../node_modules/Three';

export const getState = ({
  scene,
  renderer,
}: {
  scene?: Scene;
  renderer: WebGLRenderer;
}): State => {
  let state = getCanvaasEngineState<State>({
    containerId: 'game',
    scene,
    renderer,
  }) as State;

  // const exampleData: EmptyState<
  //   Dictionary<Component<any>>,
  //   []
  // > = jsonState as any;

  // Object.values(exampleData.component).forEach((components) => {
  //   Object.values(components).forEach((component: Component<any>) => {
  //     state = createEntity({ entity: component.entity, state });
  //     state = createComponent({
  //       state,
  //       entity: component.entity,
  //       name: component.name,
  //       data: component,
  //     });
  //   });
  // });

  // state = boxSystem(state);
  // state = aiSystem(state);
  // state = gameSystem(state);
  // state = markerSystem(state);
  // state = backgroundSystem(state);
  // state = logoSystem(state);

  state = debugSystem({ state, containerId: 'devtools' }) as State;

  // [
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },

  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  //   { entity: generateEntity() },
  // ].forEach(({ entity }) => {
  //   state = circleBlueprint({ state, entity });

  //   state = updateTransform({
  //     state,
  //     entity,
  //     update: () => ({
  //       position: [Math.random() * 8 + 1, Math.random() * 8 + 1],
  //     }),
  //   });
  //   state = updateRigidBody({
  //     state,
  //     entity,
  //     update: () => ({
  //       force: [
  //         Math.random() > 0.5 ? 0.001 : -0.001,
  //         Math.random() > 0.5 ? 0.001 : -0.001,
  //       ],
  //     }),
  //   });
  // });

  const entity1 = generateEntity();
  const entity2 = generateEntity();

  state = circleBlueprint({ state, entity: entity1 });

  state = updateTransform({
    state,
    entity: entity1,
    update: () => ({
      position: [2, 2, 0],
    }),
  });
  state = updateRigidBody({
    state,
    entity: entity1,
    update: () => ({
      force: [0.001, 0],
    }),
  });

  state = circleBlueprint({ state, entity: entity2 });

  state = updateTransform({
    state,
    entity: entity2,
    update: () => ({
      position: [4, 2, 0],
    }),
  });
  state = updateRigidBody({
    state,
    entity: entity2,
    update: () => ({
      force: [-0.001, 0],
    }),
  });

  const barrier1 = generateEntity();
  const barrier2 = generateEntity();
  const barrier3 = generateEntity();
  const barrier4 = generateEntity();
  const barrier5 = generateEntity();
  const barrier6 = generateEntity();

  [
    { entity: barrier1, position: vector(0, 0), position2: vector(5, -5) },
    { entity: barrier2, position: vector(5, -5), position2: vector(10, 0) },
    { entity: barrier3, position: vector(10, 0), position2: vector(10, 10) },
    { entity: barrier4, position: vector(10, 10), position2: vector(5, 15) },
    { entity: barrier5, position: vector(5, 15), position2: vector(0, 10) },
    { entity: barrier6, position: vector(0, 10), position2: vector(0, 0) },
  ].forEach(({ entity, position, position2 }) => {
    state = createEntity({ state, entity });

    state = barrierBlueprint({ state, entity });
    state = updateCollider({
      state,
      entity,
      update: () => ({ data: { type: 'line', position, position2 } }),
    });
  });

  state = updateCamera({
    state,
    entity: cameraEntity,
    update: () => ({
      position: [5, 5, 0],
      // distance: 10,
      // left: -5,
      // right: 15,
      // bottom: -5,
      // top: 15,
    }),
  });

  return state;
};
