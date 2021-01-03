import {
  Entity,
  getComponent,
  getEntity,
  MouseInteraction,
  Sprite,
} from '@arekrado/canvas-engine'
import { setComponent } from '@arekrado/canvas-engine'
import { componentName } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { Area } from '../component/area'

import { User } from '../component/user'
import { userId } from '../util/variables'
import { Unit } from '../component/unit'

import areaActiveImg from '../asset/area-active.png'
import areaImg from '../asset/area.png'
import { eventBus } from '../util/eventBus'

type MoveUnits = (params: {
  state: State
  areaTarget: Area
  user: User
}) => State
const moveUnits: MoveUnits = ({ state, user, areaTarget }) => {
  if (!user.selectedAreaId) {
    return state
  }

  const areaFrom = getComponent<Area>('area', {
    state,
    entity: { id: user.selectedAreaId } as Entity,
  })

  const areaTargetEntity = getEntity({
    state,
    entityId: areaTarget.entity.id,
  })

  if (!areaFrom || !areaTargetEntity) {
    return state
  }

  const v1 = setComponent<User>('user', {
    state,
    data: {
      ...user,
      action: 'idle',
      selectedAreaId: undefined,
    },
  })
  
  eventBus.dispatch('setUserAction', 'idle')

  return areaFrom.units.reduce((acc, unitId) => {
    const unit = getComponent<Unit>('unit', {
      state: acc,
      entity: { id: unitId } as Entity,
    })

    return unit
      ? setComponent<Unit>('unit', {
          state: acc,
          data: {
            ...unit,
            target: areaTargetEntity.position,
          },
        })
      : acc
  }, v1)
}

export const areaSystem = (state: State) =>
  createSystem<Component<Area>>({
    name: 'area',
    state,
    tick: ({ state, component }) => {
      const mouseInteraction = getComponent<MouseInteraction>(
        componentName.mouseInteraction,
        {
          state,
          entity: component.entity,
        },
      )

      const sprite = getComponent<Sprite>(componentName.sprite, {
        state,
        entity: component.entity,
      })

      const entity = getEntity({
        state,
        entityId: component.entity.id,
      })

      if (mouseInteraction && entity && sprite) {
        let v1: State

        if (mouseInteraction.isMouseEnter) {
          v1 = setComponent<Sprite>(componentName.sprite, {
            state,
            data: {
              ...sprite,
              src: areaActiveImg,
            },
          })
        } else if (mouseInteraction.isMouseLeave) {
          v1 = setComponent<Sprite>(componentName.sprite, {
            state,
            data: {
              ...sprite,
              src: areaImg,
            },
          })
        } else {
          v1 = state
        }

        let v2: State = v1
        if (mouseInteraction.isClicked) {
          const user = getComponent<User>('user', {
            state: v1,
            entity: { id: userId } as Entity,
          })

          if (user?.action === 'idle') {
            v2 = setComponent<User>('user', {
              state: v1,
              data: {
                ...user,
                selectedAreaId: component.entity.id,
              },
            })
          }

          if (
            user?.action === 'moveUnits' &&
            user.selectedAreaId !== component.entity.id
          ) {
            v2 = moveUnits({
              state: v1,
              user,
              areaTarget: component,
            })
          }
        }

        return v2
      }

      return state
    },
  })
