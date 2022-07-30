import {
  createTransform,
  createEntity,
  createCollider,
  createRigidBody,
  defaultCollider,
  defaultRigidBody,
  defaultTransform,
  Entity,
} from '../../node_modules/@arekrado/canvas-engine';
import { State } from './type';

export const circleBlueprint = ({
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

  const radius = Math.random() * 0.6 + 0.1;

  state = createCollider({
    state,
    entity,
    data: defaultCollider({
      layer: {
        belongs: ['knight'],
        interacts: ['knight', 'barrier'],
      },
      data: [{ type: 'circle', radius, position: [0, 0] }],
    }),
  });
  state = createRigidBody({
    state,
    entity,
    data: defaultRigidBody({ mass: radius, force: [0, 0.001] }),
  });
  // state = createMaterial({
  //   state,
  //   entity,
  //   data: {
  //     uniqueId: parseInt(entity),
  //     diffuseTexture: circleTexture,
  //     diffuseColor: [1, 1, 1, 1],
  //   },
  // });
  // state = createMesh({
  //   state,
  //   entity,
  //   data: {
  //     uniqueId: parseInt(entity),
  //     materialEntity: [entity],
  //     data: {
  //       type: 'plane',
  //       width: 1,
  //       height: 1,
  //       updatable: false,
  //       sideOrientation: 0,
  //     },
  //   },
  // });

  return state;
};
