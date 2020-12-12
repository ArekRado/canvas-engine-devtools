import { componentName } from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  entity,
} from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

import cityImg from '../asset/city.png'
import { defaultCity } from '../component/city'
import { areaBlueprint } from './area'

const generate = entity.generate
const entitySet = entity.set

type CityBlueprint = (params: {
  state: State
  entity?: Entity
  position: Vector2D
}) => State
export const cityBlueprint: CityBlueprint = (params) => {
  const entity = params.entity || generate('city')

  const v1 = entitySet({ state: params.state, entity })

  const v2 = setComponent({
    state: v1,
    name: componentName.transform,
    data: defaultData.transform({ entity, position: params.position }),
  })

  const v3 = setComponent({
    state: v2,
    name: componentName.sprite,
    data: defaultData.sprite({
      entity,
      src: cityImg,
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
    name: 'city',
    data: defaultCity({
      entity,
    }),
  })

  const v6 = areaBlueprint({
    state: v5,
    parent: entity,
    position: params.position,
  })

  return v6
}
