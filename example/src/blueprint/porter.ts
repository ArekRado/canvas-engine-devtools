import { componentName } from '@arekrado/canvas-engine'
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
const entitySet = entity.set

type PorterBlueprint = (params: {
  state: State
  entity?: Entity
  target: Vector2D
  position: Vector2D
}) => State
export const porterBlueprint: PorterBlueprint = (params) => {
  const entity = params.entity || generate('porter')

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
      src: porterImg,
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
    name: 'porter',
    data: defaultPorter({
      entity,
      target: params.target,
    }),
  })

  return v5
}