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
  scale,
  sub,
  vector,
  vectorZero,
} from '@arekrado/vector-2d'
import { Player } from '../component/player'

const gravity = vector(0, 20)

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
  const playerPosition = sub(
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

type Move = (params: {
  state: State
  entityId: Guid
  player: Player
  leftCollide: CollideBox
  rightCollide: CollideBox
  topCollide: CollideBox
}) => State
const move: Move = ({
  state,
  entityId,
  player,
  leftCollide,
  rightCollide,
  topCollide,
}) => {
  const entity = getEntity({ state, entityId })
  const sprite = getComponent(componentName.sprite, { state, entityId })
  let v1 = state

  if (entity && sprite) {
    // Jump
    if (
      topCollide.collisions.length === 0 &&
      state.keyboard['w']?.isDown &&
      player.isJumping === false &&
      magnitude(player.fallVelocity) === 0
    ) {
      v1 = setComponent<Player>('player', {
        state: v1,
        data: {
          ...player,
          isJumping: true,
          fallVelocity: vectorZero(),
          jumpVelocity: vector(0, 500),
        },
      })
    }

    // Move right
    if (
      rightCollide.collisions.length === 0 &&
      state.keyboard['d']?.isPressed
    ) {
      v1 = setEntity({
        state: v1,
        entity: {
          ...entity,
          position: add(entity.position, vector(3, 0)),
        },
      })

      v1 = setComponent(componentName.sprite, {
        state: v1,
        data: {
          ...sprite,
          anchor: vector(0, 1),
          scale: vector(3, 3),
        },
      })
    }

    // Move left
    if (leftCollide.collisions.length === 0 && state.keyboard['a']?.isPressed) {
      v1 = setEntity({
        state: v1,
        entity: {
          ...entity,
          position: add(entity.position, vector(-3, 0)),
        },
      })

      v1 = setComponent(componentName.sprite, {
        state: v1,
        data: {
          ...sprite,
          anchor: vector(0.67, 1),
          scale: vector(-3, 3),
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
      const bottomCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: component.bottomCollideId,
        state,
      })

      const leftCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: component.leftCollideId,
        state,
      })

      const rightCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: component.rightCollideId,
        state,
      })

      const topCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: component.topCollideId,
        state,
      })

      const entity = getEntity({
        entityId: component.entityId,
        state,
      })

      if (
        bottomCollide &&
        entity &&
        leftCollide &&
        rightCollide &&
        topCollide
      ) {
        let v1 = state

        if (component.isJumping) {
          v1 = jumpGravity({
            entity,
            state: v1,
            player: component,
          })
        } else if (bottomCollide.collisions.length === 0) {
          v1 = fallGravity({
            entity,
            state: v1,
            player: component,
          })
        }

        if (
          component.jumpVelocity[1] <= 0 &&
          bottomCollide.collisions.length > 0
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
          leftCollide,
          rightCollide,
          topCollide,
        })

        return v1
      }
      return state
    },
  })
