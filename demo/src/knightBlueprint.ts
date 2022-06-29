import {
  createTransform,
  createEntity,
  createCollider,
  createRigidBody,
  createMesh,
  createMaterial,
  defaultCollider,
  defaultRigidBody,
  defaultTransform,
  MeshType,
  Entity,
} from '../../node_modules/@arekrado/canvas-engine';
import { State } from './type';

import knightTexture from './assets/knight.png';

export const knightBlueprint = ({
  state,
  entity,
}: {
  state: State;
  entity: Entity;
}): State => {
  state = createEntity({ state, entity });
  state = createTransform({
    state,
    entity,
    data: defaultTransform({
      position: [0, 1],
      scale: [1, 1],
    }),
  });
  state = createCollider({
    state,
    entity,
    data: defaultCollider({
      layers: ['knight', 'barrier'],
      data: [{ type: 'circle', radius: 1, position: [0, 0] }],
    }),
  });
  state = createRigidBody({
    state,
    entity,
    data: defaultRigidBody({ mass: 1, force: [0, 0.001] }),
  });
  state = createMaterial({
    state,
    entity,
    data: {
      uniqueId: parseInt(entity),
      diffuseTexture: knightTexture,
      diffuseColor: [1, 1, 1, 1],
    },
  });
  state = createMesh({
    state,
    entity,
    data: {
      type: MeshType.plane,
      uniqueId: parseInt(entity),
      width: 1,
      height: 1,
      updatable: false,
      sideOrientation: 0,
      materialEntity: [entity],
    },
  });

  return state;
};
