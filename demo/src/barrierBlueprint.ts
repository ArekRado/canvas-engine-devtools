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

export const barrierBlueprint = ({
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
      position: [0, 0, 0],
      scale: [1, 1],
    }),
  });
  state = createCollider({
    state,
    entity,
    data: defaultCollider({
      layer: {
        belongs: ['barrier'],
        interacts: [],
      },
      data: { type: 'line', position: [0, 0], position2: [0, 10] },
    }),
  });
  state = createRigidBody({
    state,
    entity,
    data: defaultRigidBody({ mass: 1, force: [0, 0], isStatic: true }),
  });

  return state;
};
