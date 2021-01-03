import { componentName, entity } from '@arekrado/canvas-engine'
import { getComponent, setComponent, Transform } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { vector } from '@arekrado/vector-2d'
import { porterBlueprint } from '../blueprint/porter'
import { City } from '../component/city'

export const citySystem = (state: State) =>
  createSystem<Component<City>>({
    name: 'city',
    state,
    tick: ({ state, component }) => {
      const transform = getComponent<Transform>(componentName.transform, {
        state,
        entity: component.entity,
      })

      if (transform) {
        const unitProductionTimer =
          component.unitProductionTimer + state.time.delta
        const timerEnded = unitProductionTimer > 30000

        let v1 = state

        if(timerEnded) {
          const porterEntity = entity.generate('porter');
          
          const v2 = porterBlueprint({
            state,
            entity: porterEntity,
            position: transform.position,
            target: vector(Math.random() * 200, Math.random() * 500),
          })

          v1 = v2; 
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
