import { getComponent } from '@arekrado/canvas-engine'
import { CollideCircle } from '@arekrado/canvas-engine'
import { setComponent } from '@arekrado/canvas-engine'
import { componentName } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { Area } from '../component/area'
import { isMouseOver } from '../util/isMouseOver'
import areaActiveImg from '../asset/area-active.png'

export const areaSystem = (state: State) =>
  createSystem<Component<Area>>({
    name: 'area',
    state,
    tick: ({ state, component }) => {
      const collideCircle = getComponent<CollideCircle>({
        state,
        name: componentName.collideCircle,
        entity: component.entity,
      })

      if (collideCircle) {
        if (
          isMouseOver({
            collideCircle,
            mouse: state.mouse,
          })
        ) {
          return setComponent({
            name: componentName.sprite,
            state,
            data: {
              ...component,
              src: areaActiveImg,
            },
          })
        }
      }

      return state
    },
  })
