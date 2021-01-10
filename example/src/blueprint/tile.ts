import {
  componentName,
  MouseInteraction,
  Sprite,
  setEntity,
  generateEntity,
  setComponent,
  State,
  defaultData,
  CollideBox,
} from '@arekrado/canvas-engine'
import { vector, Vector2D, vectorZero } from '@arekrado/vector-2d'

import tileImg from '../asset/shadow.png'

type TileBlueprint = (params: { state: State; position: Vector2D }) => State
export const tileBlueprint: TileBlueprint = (params) => {
  const entity = {
    ...generateEntity('tile'),
    position: params.position,
  }
  const v1 = setEntity({ state: params.state, entity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entityId: entity.id,
      src: tileImg,
    }),
  })

  const v4 = setComponent<CollideBox>(componentName.collideBox, {
    state: v3,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(50, 50),
      position: vectorZero(),
    }),
  })

  return v4
}
