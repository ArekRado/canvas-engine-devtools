import {
  CollideBox,
  Entity,
  getComponent,
  getEntity,
  setComponent,
  setEntity,
} from '@arekrado/canvas-engine'
import { componentName } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import {
  add,
  magnitude,
  normalize,
  scale,
  sub,
  vector,
  vectorZero,
} from '@arekrado/vector-2d'
import { Player } from '../component/player'

const jumpHeight = 200
const gravity = vector(0, 10)
let onGround = false

type JumpGravity = (params: {
  state: State
  entity: Entity
  player: Player
}) => State
const jumpGravity: JumpGravity = ({ state, entity, player }) => {
  const playerPosition = add(
    entity.position,
    scale(state.time.delta / 1000, player.jumpVelocity),
  )

  let jumpVelocity = add(player.jumpVelocity, gravity)

  if (magnitude(jumpVelocity) > jumpHeight) {
    jumpVelocity = scale(-1, jumpVelocity)
  }

  const v1 = setEntity({
    state,
    entity: {
      ...entity,
      position: playerPosition,
    },
  })

  const v2 = setComponent<Player>('player', {
    state: v1,
    data: {
      ...player,
      jumpVelocity,
    },
  })

  return v2
}
type FallGravity = (params: {
  state: State
  entity: Entity
  player: Player
}) => State
const fallGravity: FallGravity = ({ state, entity, player }) => {
  const playerPosition = add(
    entity.position,
    scale(state.time.delta / 1000, player.fallVelocity),
  )

  let fallVelocity = add(player.fallVelocity, gravity)

  const v1 = setEntity({
    state,
    entity: {
      ...entity,
      position: playerPosition,
    },
  })

  const v2 = setComponent<Player>('player', {
    state: v1,
    data: {
      ...player,
      fallVelocity,
    },
  })

  return v2
}

export const playerSystem = (state: State) =>
  createSystem<Component<Player>>({
    name: 'player',
    state,
    tick: ({ state, component }) => {
      const collideBox = getComponent<CollideBox>(componentName.collideBox, {
        entityId: component.entityId,
        state,
      })

      const entity = getEntity({
        entityId: component.entityId,
        state,
      })

      if (collideBox && entity) {
        let v1 = state

        if (component.isJumping) {
          v1 = jumpGravity({
            entity,
            state,
            player: component,
          })
        } else if(collideBox.collisions.length === 0) {
          v1 = fallGravity({
            entity,
            state,
            player: component,
          })
        } else if (collideBox.collisions.length > 0) {
          v1 = setComponent<Player>('player', {
            state,
            data: {
              ...component,
              isJumping: false,
              fallVelocity: vectorZero(),
              jumpVelocity: vectorZero(),
            },
          })
        } 

        if (state.keyboard['w']?.isDown) {
          v1 = setComponent<Player>('player', {
            state,
            data: {
              ...component,
              isJumping: true,
              fallVelocity: vectorZero(),
              jumpVelocity: vector(0, -20),
            },
          })
        } 

        return v1
      }
      return state
    },
  })
