import {
  Entity,
  setComponent,
  State,
  defaultData,
  entity,
} from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

import porterImg from '../asset/porter.png'
import { defaultPorter } from '../component/porter'

const generate = entity.generate

type PorterBlueprint = (params: {
  state: State
  entity?: Entity
  target: Vector2D
  position: Vector2D
}) => State
export const porterBlueprint: PorterBlueprint = (params) => {
  const entity = params.entity || generate('porter')

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
      src: porterImg,
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
    name: 'porter',
    data: defaultPorter({
      entity,
      target: params.target,
    }),
  })

  return v4
}
