import {
  Entity,
  setComponent,
  State,
  defaultData,
  entity,
} from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

import emptyArea from '../asset/example.png'
import { defaultArea } from '../component/area'

const generate = entity.generate

type AreaBlueprint = (params: {
  state: State
  entity?: Entity
  position: Vector2D
}) => State
export const areaBlueprint: AreaBlueprint = (params) => {
  const entity = params.entity || generate('area')

  const v1 = setComponent({
    state: params.state,
    name: 'transform',
    data: defaultData.transform({ entity, position: params.position }),
  })

  const v2 = setComponent({
    state: v1,
    name: 'sprite',
    data: defaultData.sprite({
      entity,
      src: emptyArea,
    }),
  })

  const v3 = setComponent({
    state: v2,
    name: 'collideCircle',
    data: defaultData.collideCircle({
      entity,
      radius: 50,
      position: params.position,
    }),
  })

  const v4 = setComponent({
    state: v3,
    name: 'area',
    data: defaultArea({
      entity,
    }),
  })

  return v4
}
