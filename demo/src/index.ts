import {
  cameraEntity,
  runRenderLoop,
  updateCamera,
  getState,
  generateEntity,
  createEntity,
  createTransform,
  defaultTransform,
  createMaterial,
  createMesh,
} from '@arekrado/canvas-engine';
import { State } from './type';
import { debugSystem } from '../../src/index';
import { DoubleSide } from 'Three';
import circleUrl from './assets/circle.png';

let state = getState<State>({
  containerId: 'game',
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

state = createMaterial({
  state,
  entity,
  data: {
    type: 'MeshStandardMaterial',
    textureUrl: circleUrl,
    side: DoubleSide,
  },
});

state = createMesh({
  state,
  entity,
  data: {
    type: 'plane',
    width: 1,
    height: 1,
    sideOrientation: 0,
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
