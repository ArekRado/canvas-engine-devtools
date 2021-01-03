import {
  CollideCircle,
  componentName,
  MouseInteraction,
  Sprite,
  setEntity,
  generateEntity,
  Entity,
  setComponent,
  State,
  defaultData,
} from '@arekrado/canvas-engine'
import { vectorZero } from '@arekrado/vector-2d'

import areaImg from '../asset/area.png'
import { Area, defaultArea } from '../component/area'

type AreaBlueprint = (params: { state: State; entity?: Entity }) => State
export const areaBlueprint: AreaBlueprint = (params) => {
  const entity = params.entity || generateEntity('area')

  const v1 = setEntity({ state: params.state, entity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entity,
      src: areaImg,
    }),
  })

  const v4 = setComponent<CollideCircle>(componentName.collideCircle, {
    state: v3,
    data: defaultData.collideCircle({
      entity,
      radius: 50,
      position: vectorZero(),
    }),
  })

  const v5 = setComponent<MouseInteraction>(componentName.mouseInteraction, {
    state: v4,
    data: defaultData.mouseInteraction({
      entity,
    }),
  })

  const v6 = setComponent<Area>('area', {
    state: v5,
    data: defaultArea({
      entity,
    }),
  })

  return v6
}
