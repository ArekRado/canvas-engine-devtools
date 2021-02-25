import {
  componentName,
  Sprite,
  setEntity,
  generateEntity,
  setComponent,
  State,
  defaultData,
  CollideBox,
} from '@arekrado/canvas-engine';
import { vector, Vector2D, vectorZero } from '@arekrado/vector-2d';

import carrotImg from '../asset/carrot.png';
import { gameComponentName } from '../util/gameComponentName';

type CarrotBlueprint = (params: { state: State; position: Vector2D }) => State;
export const carrotBlueprint: CarrotBlueprint = (params) => {
  const entity = {
    ...generateEntity(gameComponentName.carrot),
    position: params.position,
  };
  let newState = setEntity({ state: params.state, entity });

  newState = setComponent<Sprite>(componentName.sprite, {
    state: newState,
    data: defaultData.sprite({
      entityId: entity.id,
      src: carrotImg,
      scale: vector(0.5, 0.5),
    }),
  });

  newState = setComponent<CollideBox>(componentName.collideBox, {
    state: newState,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(30, 48),
      position: vectorZero(),
    }),
  });

  return newState;
};
