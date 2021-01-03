import { getComponent, setComponent, Transform } from '@arekrado/canvas-engine'
import { componentName } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { add, normalize, sub } from '@arekrado/vector-2d'
import { Unit } from '../component/unit'

export const unitSystem = (state: State) =>
  createSystem<Component<Unit>>({
    name: 'unit',
    state,
    tick: ({ state, component }) => {
      if (component.target) {
        const transform = getComponent<Transform>(componentName.transform, {
          entity: component.entity,
          state,
        })

        if (transform) {
          const direction = normalize(sub(component.target, transform.position))

          return setComponent<Transform>(componentName.transform, {
            state,
            data: {
              ...transform,
              position: add(transform.position, direction),
            },
          })
        }
      }

      return state
    },
  })
