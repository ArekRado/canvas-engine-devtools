import { Camera, componentName } from '@arekrado/canvas-engine'
import {
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
} from '@arekrado/canvas-engine'
import { vector } from '@arekrado/vector-2d'

type GameConfigurationBlueprint = (params: { state: State }) => State
export const gameConfigurationBlueprint: GameConfigurationBlueprint = (
  params,
) => {
  const cameraEntity = generateEntity(componentName.camera)

  const v1 = setEntity({ state: params.state, entity: cameraEntity })

  const v2 = setComponent<Camera>(componentName.camera, {
    state: v1,
    data: defaultData.camera({
      entityId: cameraEntity.id,
      position: vector(400, 300),
      zoom: 1,
    }),
  })

  return v2
}
