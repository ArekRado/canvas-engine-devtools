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

  const v2 = setComponent({
    state: v1,
    name: componentName.transform,
    data: defaultData.transform({
      entity,
      position: params.position,
      parent: params.parent,
    }),
  })

  const v3 = setComponent({
    state: v2,
    name: componentName.sprite,
    data: defaultData.sprite({
      entity,
      src: areaImg,
    }),
  })

  const v4 = setComponent({
    state: v3,
    name: componentName.collideCircle,
    data: defaultData.collideCircle({
      entity,
      radius: 50,
      position: params.position,
    }),
  })

  const v5 = setComponent({
    state: v4,
    name: 'area',
    data: defaultArea({
      entity,
    }),
  })

  return v5
}
