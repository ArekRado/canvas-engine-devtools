import {
  getComponent,
  MouseInteraction,
  Transform,
} from '@arekrado/canvas-engine'
import { setComponent } from '@arekrado/canvas-engine'
import { componentName } from '@arekrado/canvas-engine'
import { Component, createSystem, State } from '@arekrado/canvas-engine'
import { Area } from '../component/area'

import areaActiveImg from '../asset/area-active.png'
import areaImg from '../asset/area.png'
import { eventBus } from '../util/eventBus'

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

      const transform = getComponent<Transform>(componentName.transform, {
        state,
        entity: component.entity,
      })

      if (mouseInteraction && transform) {
        let v1: State

        if (mouseInteraction.isMouseEnter) {
          v1 = setComponent(componentName.sprite, {
            state,
            data: {
              ...component,
              src: areaActiveImg,
            },
          })
        } else if (mouseInteraction.isMouseLeave) {
          v1 = setComponent(componentName.sprite, {
            state,
            data: {
              ...component,
              src: areaImg,
            },
          })
        } else {
          v1 = state
        }

        if (mouseInteraction.isClicked) {
          console.log('isClicked')

          eventBus.dispatch('showAreaMenu', {
            entity: transform.parent,
          })
        }

        return v1
      }

      return state
    },
  })
