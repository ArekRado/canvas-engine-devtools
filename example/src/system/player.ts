import {
  CollideBox,
  Entity,
  getComponent,
  getEntity,
  Guid,
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

const gravity = vector(0, 10)

type JumpGravity = (params: {
  state: State
  entity: Entity
  player: Player
}) => State
const jumpGravity: JumpGravity = ({ state, entity, player }) => {
  const playerPosition = sub(
    entity.position,
    scale(state.time.delta / 1000, player.jumpVelocity),
  )

  const jumpVelocity = sub(player.jumpVelocity, gravity)

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
      isJumping: magnitude(jumpVelocity) > 0,
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

type Move = (params: { state: State; entityId: Guid; player: Player }) => State
const move: Move = ({ state, entityId, player }) => {
  const entity = getEntity({ state, entityId })
  let v1 = state

  if (entity) {
    if (state.keyboard['w']?.isDown) {
      v1 = setComponent<Player>('player', {
        state: v1,
        data: {
          ...player,
          isJumping: true,
          fallVelocity: vectorZero(),
          jumpVelocity: vector(0, 300),
        },
      })
    }

    if (state.keyboard['d']?.isPressed) {
      v1 = setEntity({
        state: v1,
        entity: {
          ...entity,
          position: add(entity.position, vector(1, 0)),
        },
      })
    }

    if (state.keyboard['a']?.isPressed) {
      v1 = setEntity({
        state: v1,
        entity: {
          ...entity,
          position: add(entity.position, vector(-1, 0)),
        },
      })
    }
  }

  return v1
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
            state: v1,
            player: component,
          })
        } else if (collideBox.collisions.length === 0) {
          v1 = fallGravity({
            entity,
            state: v1,
            player: component,
          })
        }

        if (
          component.jumpVelocity[1] <= 0 &&
          collideBox.collisions.length > 0
        ) {
          v1 = setComponent<Player>('player', {
            state: v1,
            data: {
              ...component,
              isJumping: false,
              fallVelocity: vectorZero(),
              jumpVelocity: vectorZero(),
            },
          })
        }

        v1 = move({
          entityId: entity.id,
          state: v1,
          player: component,
        })

        return v1
      }
      return state
    },
  })
