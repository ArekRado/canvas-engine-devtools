import {
  componentName,
  Entity,
  generateEntity,
  setComponent,
  setEntity,
  State,
  defaultData,
  Text,
} from '@arekrado/canvas-engine';
import { ui, Ui } from '../component/ui';
import { gameComponentName } from '../util/gameComponentName';

type UiBlueprint = (params: {
  state: State;
  scoreCounterEntity: Entity;
}) => State;
export const uiBlueprint: UiBlueprint = (params) => {
  const entity = generateEntity(gameComponentName.ui);

  let state = setEntity({ state: params.state, entity });
  state = setEntity({ state, entity: params.scoreCounterEntity });

  state = setComponent<Ui>(gameComponentName.ui, {
    state,
    data: ui({
      entityId: entity.id,
      scoreCounterId: params.scoreCounterEntity.id,
    }),
  });
  state = setComponent<Text>(componentName.text, {
    state,
    data: defaultData.text({
      entityId: params.scoreCounterEntity.id,
      value: "Text",
    }),
  });

  return state;
};

