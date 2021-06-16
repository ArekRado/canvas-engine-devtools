import {
  Animation,
  CollideBox,
  componentName,
  Guid,
  Sprite,
  Entity,
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
  Line,
  Rectangle,
  Ellipse,
} from '@arekrado/canvas-engine';
import { vector, Vector2D } from '@arekrado/vector-2d';
import { walkAnimation } from '../animation/walk';

import playerImg from '../asset/player.png';

import { defaultPlayer, Player } from '../component/player';
import { gameComponentName } from '../util/gameComponentName';

type PlayerBlueprint = (params: {
  state: State;
  entity?: Entity;
  position: Vector2D;
  scoreCounterId: Guid;
}) => State;
export const playerBlueprint: PlayerBlueprint = (params) => {
  const entity = {
    ...(params.entity || generateEntity(gameComponentName.player)),
    position: params.position,
  };

  const leftCollideEntity = generateEntity('leftCollide', {
    parentId: entity.id,
  });
  const rightCollideEntity = generateEntity('rightCollide', {
    parentId: entity.id,
  });
  const topCollideEntity = generateEntity('topCollide', {
    parentId: entity.id,
  });
  const bottomCollideEntity = generateEntity('bottomCollide', {
    parentId: entity.id,
  });

  let state = setEntity({ state: params.state, entity });

  state = setEntity({ state, entity: leftCollideEntity });
  state = setEntity({ state, entity: rightCollideEntity });
  state = setEntity({ state, entity: topCollideEntity });
  state = setEntity({ state, entity: bottomCollideEntity });

  state = setComponent<Sprite>(componentName.sprite, {
    state,
    data: defaultData.sprite({
      entityId: entity.id,
      src: playerImg,
      scale: vector(3, 3),
    }),
  });

  state = setComponent<Player>(gameComponentName.player, {
    state,
    data: defaultPlayer({
      entityId: entity.id,
      leftCollideId: leftCollideEntity.id,
      rightCollideId: rightCollideEntity.id,
      topCollideId: topCollideEntity.id,
      bottomCollideId: bottomCollideEntity.id,
      scoreCounterId: params.scoreCounterId,
    }),
  });

  state = setComponent<Animation>(componentName.animation, {
    state,
    data: walkAnimation(entity.id),
  });

  state = setComponent<CollideBox>(componentName.collideBox, {
    state,
    data: defaultData.collideBox({
      entityId: bottomCollideEntity.id,
      size: vector(26, 1),
      position: vector(34, -3),
    }),
  });

  state = setComponent<CollideBox>(componentName.collideBox, {
    state,
    data: defaultData.collideBox({
      entityId: leftCollideEntity.id,
      size: vector(1, 50),
      position: vector(29, 20),
    }),
  });

  state = setComponent<CollideBox>(componentName.collideBox, {
    state,
    data: defaultData.collideBox({
      entityId: rightCollideEntity.id,
      size: vector(1, 50),
      position: vector(66, 20),
    }),
  });

  state = setComponent<CollideBox>(componentName.collideBox, {
    state,
    data: defaultData.collideBox({
      entityId: topCollideEntity.id,
      size: vector(40, 1),
      position: vector(28, 75),
    }),
  });

  // experimental
  // state = setComponent<Line>(componentName.line, {
  //   state,
  //   data: defaultData.line({
  //     entityId: entity.id,
  //     borderColor: [1, 0, 0, 1] as any,
  //     path: [
  //       vector(-0.3, 0.5),
  //       vector(0.5, -0.5),
  //       vector(-0.7, -0.7),
  //       vector(0.9, -0.2),
  //     ],
  //   }),
  // });

  state = setComponent<Sprite>(componentName.sprite, {
    state,
    data: defaultData.sprite({
      entityId: entity.id,
      src: playerImg,
      anchor: vector(0.5, 0.5),
      scale: vector(3, 3),
    }),
  });

  // state = setComponent<Rectangle>(componentName.rectangle, {
  //   state,
  //   data: defaultData.rectangle({
  //     entityId: entity.id,
  //     size: vector(0.8, 0.8),
  //     fillColor: [1, 1, 0, 1],
  //     // borderColor: [1, 0, 1, 1] as any,
  //   }),
  // });

  // state = setComponent<Ellipse>(componentName.ellipse, {
  //   state,
  //   data: defaultData.ellipse({
  //     entityId: entity.id,
  //     size: [0.5, 0.5],
  //     fillColor: [1, 0, 1, 1],
  //   }),
  // });

  return state;
};
