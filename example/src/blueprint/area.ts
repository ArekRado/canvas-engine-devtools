import { componentName } from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  entity,
} from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

import areaImg from '../asset/area.png'
import { defaultArea } from '../component/area'

const generate = entity.generate
const entitySet = entity.set

type AreaBlueprint = (params: {
  state: State
  entity?: Entity
  position: Vector2D
  parent: Entity
}) => State
export const areaBlueprint: AreaBlueprint = (params) => {
  const entity = params.entity || generate('area')

  const v1 = entitySet({ state: params.state, entity })

  const v2 = setComponent(componentName.transform, {
    state: v1,
    data: defaultData.transform({
      entity,
      position: params.position,
      parent: params.parent,
    }),
  })

  const v3 = setComponent(componentName.sprite, {
    state: v2,
    data: defaultData.sprite({
      entity,
      src: areaImg,
    }),
  })

  const v4 = setComponent(componentName.collideCircle, {
    state: v3,
    data: defaultData.collideCircle({
      entity,
      radius: 50,
      position: params.position,
    }),
  })

  const v5 = setComponent(componentName.mouseInteraction, {
    state: v4,
    data: defaultData.mouseInteraction({
      entity,
    }),
  })

  const v6 = setComponent('area', {
    state: v5,
    data: defaultArea({
      entity,
    }),
  })

  return v6
}
