import { Camera, componentName } from '@arekrado/canvas-engine';
import {
  setComponent,
  State,
  defaultData,
  setEntity,
  generateEntity,
} from '@arekrado/canvas-engine';
import { vector } from '@arekrado/vector-2d';

type GameConfigurationBlueprint = (params: { state: State }) => State;
export const gameConfigurationBlueprint: GameConfigurationBlueprint = (
  params
) => {
  const cameraEntity = generateEntity(componentName.camera);

  let state = setEntity({ state: params.state, entity: cameraEntity });

  state = setComponent<Camera>(componentName.camera, {
    state,
    data: defaultData.camera({
      entityId: cameraEntity.id,
      position: vector(400, 300),
      zoom: 1,
    }),
  });

  return state;
};
