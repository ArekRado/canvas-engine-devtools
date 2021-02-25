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
import { gameComponentName } from '../util/gameComponentName'

type TileBlueprint = (params: {
  state: State
  position: Vector2D
  src: string
}) => State
export const tileBlueprint: TileBlueprint = (params) => {
  const entity = {
    ...generateEntity(gameComponentName.tile),
    position: params.position,
  }
  const v1 = setEntity({ state: params.state, entity })

  const v3 = setComponent<Sprite>(componentName.sprite, {
    state: v1,
    data: defaultData.sprite({
      entityId: entity.id,
      src: params.src,
      scale: vector(3, 3),
    }),
  })

  const v4 = setComponent<CollideBox>(componentName.collideBox, {
    state: v3,
    data: defaultData.collideBox({
      entityId: entity.id,
      size: vector(48, 48),
      position: vectorZero(),
    }),
  })

  return v4
}
