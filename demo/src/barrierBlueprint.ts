import {
  createTransform,
  defaultTransform,
  Entity,
} from '@arekrado/canvas-engine';
import { State } from './type';

export const barrierBlueprint = ({
  state,
  entity,
}: {
  state: State;
  entity: Entity;
}): State => {
  state = createTransform({
    state,
    entity,
    data: defaultTransform({
      position: [0, 0, 0],
      scale: [1, 1],
    }),
  });

  return state;
};
