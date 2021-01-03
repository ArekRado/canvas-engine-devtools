import {
  getEntity,
  setEntity,
  Component,
  createSystem,
  State,
} from '@arekrado/canvas-engine'
import { add, normalize, sub } from '@arekrado/vector-2d'
import { Unit } from '../component/unit'

export const unitSystem = (state: State) =>
  createSystem<Component<Unit>>({
    name: 'unit',
    state,
    tick: ({ state, component }) => {
      if (component.target) {
        const entity = getEntity({
          state,
          entityId: component.entity.id,
        })

        if (entity) {
          const direction = normalize(sub(component.target, entity.position))

          return setEntity({
            state,
            entity: {
              ...entity,
              position: add(entity.position, direction),
            },
          })
        }
      }

      return state
    },
  })
