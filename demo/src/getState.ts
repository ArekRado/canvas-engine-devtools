import {
  getState as getCanvaasEngineState,
  generateEntity,
  updateCamera,
  cameraEntity,
  updateRigidBody,
  updateTransform,
  updateCollider,
} from '../../node_modules/@arekrado/canvas-engine';
import { Scene } from '../../node_modules/@babylonjs/core/scene';
import { UniversalCamera } from '../../node_modules/@babylonjs/core/Cameras/universalCamera';
import { StandardMaterial } from '../../node_modules/@babylonjs/core/Materials/standardMaterial';
import { MeshBuilder } from '../../node_modules/@babylonjs/core/Meshes/meshBuilder';
import { Texture } from '../../node_modules/@babylonjs/core/Materials/Textures/texture';
import { Color3 } from '../../node_modules/@babylonjs/core/Maths/math.color';
import { Vector3 } from '../../node_modules/@babylonjs/core/Maths/math.vector';
import { State } from './type';
import { debugSystem } from '../../src/index';

import { knightBlueprint } from './knightBlueprint';
import { barrierBlueprint } from './barrierBlueprint';
import { vector } from '@arekrado/vector-2d';

export const getState = ({
  scene,
  camera,
}: {
  scene?: Scene;
  camera?: UniversalCamera;
}): State => {
  let state = getCanvaasEngineState<State>({
    containerId: 'game',
    scene,
    camera,
    Vector3,
    StandardMaterial,
    MeshBuilder,
    Texture,
    Color3,
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

  state = debugSystem(state, 'devtools') as State;

  const knight1 = generateEntity();
  const knight2 = generateEntity();
  const knight3 = generateEntity();
  const knight4 = generateEntity();

  state = knightBlueprint({ state, entity: knight1 });
  state = knightBlueprint({ state, entity: knight2 });
  state = knightBlueprint({ state, entity: knight3 });
  state = knightBlueprint({ state, entity: knight4 });
  state = updateTransform({
    state,
    entity: knight1,
    update: () => ({ position: [5, 3] }),
  });
  state = updateTransform({
    state,
    entity: knight2,
    update: () => ({ position: [5, 7] }),
  });
  state = updateTransform({
    state,
    entity: knight3,
    update: () => ({ position: [2, 2] }),
  });
  state = updateTransform({
    state,
    entity: knight4,
    update: () => ({ position: [7, 8] }),
  });
  state = updateRigidBody({
    state,
    entity: knight1,
    update: () => ({ force: [0, 0.001] }),
  });
  state = updateRigidBody({
    state,
    entity: knight2,
    update: () => ({ force: [0, -0.001] }),
  });
  state = updateRigidBody({
    state,
    entity: knight3,
    update: () => ({ force: [-0.001, -0.001] }),
  });
  state = updateRigidBody({
    state,
    entity: knight4,
    update: () => ({ force: [0.001, 0.001] }),
  });

  const barrier1 = generateEntity();
  const barrier2 = generateEntity();
  const barrier3 = generateEntity();
  const barrier4 = generateEntity();

  [
    { entity: barrier1, position: vector(0, 0), position2: vector(10, 0) },
    { entity: barrier2, position: vector(10, 0), position2: vector(10, 10) },
    { entity: barrier3, position: vector(10, 10), position2: vector(0, 10) },
    { entity: barrier4, position: vector(0, 10), position2: vector(0, 0) },
  ].forEach(({ entity, position, position2 }) => {
    state = barrierBlueprint({ state, entity });
    state = updateCollider({
      state,
      entity,
      update: () => ({ data: [{ type: 'line', position, position2 }] }),
    });
  });

  state = updateCamera({
    state,
    entity: cameraEntity,
    update: () => ({
      position: [5, 5],
      distance: 5,
      left: 0,
      right: 10,
      bottom: 0,
      top: 10,
    }),
  });

  console.log(state.entity);

  return state;
};
