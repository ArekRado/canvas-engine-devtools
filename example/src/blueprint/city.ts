import {
  CollideCircle,
  componentName,
  Sprite,
  Transform,
} from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
} from '@arekrado/canvas-engine'
import { vector, Vector2D } from '@arekrado/vector-2d'

import cityImg from '../asset/city.png'
import { City, defaultCity } from '../component/city'
import { areaBlueprint } from './area'

type CityBlueprint = (params: {
  state: State
  entity?: Entity
  position: Vector2D
}) => State
export const cityBlueprint: CityBlueprint = (params) => {
  const entity = {
    ...(params.entity || generateEntity('city')),
    position: params.position,
  }

  const v1 = setEntity({ state: params.state, entity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entity,
      src: cityImg,
    }),
  })

  const v4 = setComponent<CollideCircle>(componentName.collideCircle, {
    state: v3,
    data: defaultData.collideCircle({
      entity,
      radius: 50,
      position: params.position,
    }),
  })

  const v5 = setComponent<City>('city', {
    state: v4,
    data: defaultCity({
      entity,
    }),
  })

  const v6 = areaBlueprint({
    state: v5,
    parentId: entity.id,
    position: vector(-3, 16),
  })

  return v6
}
