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

  const v1 = setEntity({ state: params.state, entity })

  const v2 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entityId: entity.id,
      src: playerImg,
    }),
  })

  const v5 = setComponent<CollideBox>(componentName.collideBox, {
    state: v2,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(24, 0),
      position: vector(36, 96),
    }),
  })

  const v6 = setComponent<Player>('player', {
    state: v5,
    data: defaultPlayer({
      entityId: entity.id,
    }),
  })

  const v7 = setComponent<Animation>(componentName.animation, {
    state: v6,
    data: walkAnimation(entity.id),
  })

  return v7
}
