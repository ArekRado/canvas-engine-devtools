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

  const v2 = setComponent(componentName.transform, {
    state: v1,
    data: defaultData.transform({ entity, position: params.position }),
  })

  const v3 = setComponent(componentName.sprite, {
    state: v2,
    data: defaultData.sprite({
      entity,
      src: cityImg,
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

  const v5 = setComponent('city', {
    state: v4,
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
