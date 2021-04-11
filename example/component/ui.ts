import { Component, GetDefaultComponent, Guid } from '@arekrado/canvas-engine';
import { gameComponentName } from '../util/gameComponentName';

export type Ui = Component<{
  scoreCounterId: Guid;
}>;

export const ui: GetDefaultComponent<Ui> = ({ entityId, ...data }) => ({
  entityId,
  name: gameComponentName.player,
  scoreCounterId: '',
  ...data,
});
