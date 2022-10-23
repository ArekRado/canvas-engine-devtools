import {
  cameraEntity,
  runRenderLoop,
  updateCamera,
  getState,
  generateEntity,
  createEntity,
  createTransform,
  defaultTransform,
  createCollider,
  defaultCollider,
  createRigidBody,
  defaultRigidBody,
  createMaterial,
  createMesh,
} from '../../node_modules/@arekrado/canvas-engine';
import { State } from './type';
import { debugSystem } from '../../src/index';
import { DoubleSide } from '../../node_modules/Three';
import circleUrl from './assets/circle.png';

  let state = getState<State>({
    containerId: 'game',
    window,
    document,
  }) as State;

  state = debugSystem({ state, containerId: 'devtools' }) as State;

  const entity = generateEntity();

  state = createEntity({ state, entity });
  state = createTransform({
    state,
    entity,
    data: defaultTransform({}),
  });

  const radius = Math.random() * 0.6 + 0.1;

  state = createCollider({
    state,
    entity,
    data: defaultCollider({
      layer: {
        belongs: ['knight'],
        interacts: ['knight', 'barrier'],
      },
      data: { type: 'circle', radius, position: [0, 0] },
    }),
  });

  state = createRigidBody({
    state,
    entity,
    data: defaultRigidBody({ mass: radius, force: [0.001, 0] }),
  });

  state = createMaterial({
    state,
    entity,
    data: {
      textureUrl:
      circleUrl,
      side: DoubleSide,
    },
  });

  state = createMesh({
    state,
    entity,
    data: {
      updatable: false,
      data: {
        type: 'plane',
        width: 1,
        height: 1,
        sideOrientation: 0,
      },
    },
  });



state = updateCamera({
  state,
  entity: cameraEntity,
  update: () => ({
    position: [2, 2, 6],
    lookAt: [2, 2, 0],
  }),
});

runRenderLoop({ state });
