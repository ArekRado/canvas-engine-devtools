import {
  CollideCircle,
  componentName,
  Sprite,
} from '@arekrado/canvas-engine'
import {
  Entity,
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity
} from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

import porterImg from '../asset/porter.png'
import { defaultPorter, Porter } from '../component/porter'
import { Unit } from '../component/unit'

type PorterBlueprint = (params: {
  state: State
  entity?: Entity
  target: Vector2D
  position: Vector2D
}) => State
export const porterBlueprint: PorterBlueprint = (params) => {
  const entity = {
    ...(params.entity || generateEntity('porter')),
    position: params.position,
  }

  const v1 = setEntity({ state: params.state, entity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entity,
      src: porterImg,
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

  const v5 = setComponent<Porter>('porter', {
    state: v4,
    data: defaultPorter({
      entity,
      target: params.target,
    }),
  })

  const v6 = setComponent<Unit>('unit', {
    state: v5,
    data: defaultPorter({
      entity,
      target: params.target,
    }),
  })

  return v6
}
