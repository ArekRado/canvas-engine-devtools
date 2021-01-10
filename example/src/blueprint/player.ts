import { CollideBox, componentName, Sprite } from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
} from '@arekrado/canvas-engine'
import { vector, Vector2D } from '@arekrado/vector-2d'

import playerImg from '../asset/player.png'
import shadowImg from '../asset/shadow.png'

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
  }

  const shadowEntity = {
    ...generateEntity('shadow'),
    position: entity.position,
  }

  const v1 = setEntity({ state: params.state, entity })
  const v2 = setEntity({ state: v1, entity: shadowEntity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v2,
    data: defaultData.sprite({
      entityId: entity.id,
      src: playerImg,
    }),
  })

  const v4 = setComponent<Sprite>(componentName.sprite, {
    state: v3,
    data: defaultData.sprite({
      entityId: shadowEntity.id,
      src: shadowImg,
    }),
  })

  const v5 = setComponent<CollideBox>(componentName.collideBox, {
    state: v4,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(10, 10),
      position: vector(4, 16),
    }),
  })

  const v6 = setComponent<Player>('player', {
    state: v5,
    data: defaultPlayer({
      entityId: entity.id,
      shadowId: shadowEntity.id,
    }),
  })

  return v6
}
