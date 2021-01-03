import {
  Component,
  createSystem,
  State,
  setComponent,
  generateEntity,
  getEntity,
  getComponent,
  Entity,
} from '@arekrado/canvas-engine'
import { vector } from '@arekrado/vector-2d'
import { porterBlueprint } from '../blueprint/porter'
import { Area } from '../component/area'
import { City } from '../component/city'

export const citySystem = (state: State) =>
  createSystem<Component<City>>({
    name: 'city',
    state,
    tick: ({ state, component }) => {
      const entity = getEntity({
        state,
        entityId: component.entity.id,
      })

      const area = getComponent<Area>('area', {
        state,
        entity: { id: component.areaId } as Entity,
      })

      if (entity && area) {
        const unitProductionTimer =
          component.unitProductionTimer + state.time.delta
        const timerEnded = unitProductionTimer > 3000

        let v1 = state

        if (timerEnded) {
          const porterEntity = generateEntity('porter')

          const v2 = porterBlueprint({
            state,
            entity: porterEntity,
            position: entity.position,
            target: vector(Math.random() * 200, Math.random() * 500),
          })

          const v3 = setComponent<Area>('area', {
            state: v2,
            data: {
              ...area,
              units: [...area.units, porterEntity.id],
            },
          })

          v1 = v3
        }

        return setComponent<City>('city', {
          state: v1,
          data: {
            ...component,
            unitProductionTimer: timerEnded ? 0 : unitProductionTimer,
          },
        })
      }

      return state
    },
  })
