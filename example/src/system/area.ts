import { getComponent } from '@arekrado/canvas-engine'
import { CollideCircle } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { Area } from '../component/area'
import { isMouseOver } from '../util/isMouseOver'

export const areaSystem = (state: State) =>
  createSystem<Component<Area>>({
    name: 'area',
    state,
    tick: ({ state, component }) => {
      if (component) {
        const collideCircle = getComponent<CollideCircle>({
          state,
          name: 'collideCircle',
          entity: component.entity,
        })

        if (collideCircle) {
          if (
            isMouseOver({
              collideCircle,
              mouse: state.mouse,
            })
          ) {
            console.log('isOver')
          }
        }
      }

      return state
    },
  })
