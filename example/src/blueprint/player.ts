import {
  Animation,
  CollideBox,
  componentName,
  Sprite,
} from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
} from '@arekrado/canvas-engine'
import { vector, Vector2D } from '@arekrado/vector-2d'
import { walkAnimation } from '../animation/walk'

import playerImg from '../asset/player.png'

import { defaultPlayer, Player } from '../component/player'

type PlayerBlueprint = (params: {
  state: State
  entity?: Entity
  position: Vector2D
}) => State
export const playerBlueprint: PlayerBlueprint = (params) => {
  const entity = {
    ...(params.entity || generateEntity('player')),
    position: params.position,
    scale: vector(3, 3),
  }

  const leftCollideEntity = generateEntity('leftCollide', {
    parentId: entity.id,
  })
  const rightCollideEntity = generateEntity('rightCollide', {
    parentId: entity.id,
  })
  const topCollideEntity = generateEntity('topCollide', { parentId: entity.id })

  const v1 = setEntity({ state: params.state, entity })

  const v2 = setEntity({ state: v1, entity: leftCollideEntity })
  const v3 = setEntity({ state: v2, entity: rightCollideEntity })
  const v4 = setEntity({ state: v3, entity: topCollideEntity })

  const v5 = setComponent<Sprite>(componentName.sprite, {
    state: v4,
    data: defaultData.sprite({
      entityId: entity.id,
      src: playerImg,
    }),
  })

  const v6 = setComponent<CollideBox>(componentName.collideBox, {
    state: v5,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(24, 0),
      position: vector(36, 96),
    }),
  })

  const v7 = setComponent<Player>('player', {
    state: v6,
    data: defaultPlayer({
      entityId: entity.id,
      leftCollideId: leftCollideEntity.id,
      rightCollideId: rightCollideEntity.id,
      topCollideId: topCollideEntity.id,
    }),
  })

  const v8 = setComponent<Animation>(componentName.animation, {
    state: v7,
    data: walkAnimation(entity.id),
  })

  const v9 = setComponent<CollideBox>(componentName.collideBox, {
    state: v8,
    data: defaultData.collideBox({
      entityId: leftCollideEntity.id,
      size: vector(24, 0),
      position: vector(36, 96),
    }),
  })

  const v10 = setComponent<CollideBox>(componentName.collideBox, {
    state: v9,
    data: defaultData.collideBox({
      entityId: rightCollideEntity.id,
      size: vector(24, 0),
      position: vector(36, 96),
    }),
  })

  const v11 = setComponent<CollideBox>(componentName.collideBox, {
    state: v10,
    data: defaultData.collideBox({
      entityId: topCollideEntity.id,
      size: vector(24, 0),
      position: vector(36, 96),
    }),
  })

  return v11
}
