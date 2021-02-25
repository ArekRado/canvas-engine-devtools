// import 'regenerator-runtime/runtime'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CanvasEngineDevtools, registerDebugSystem } from '../src/index';
import '../src/styles.css';
import {
  runOneFrame,
  State,
  initialState,
  initializeEngine,
  asset,
} from '@arekrado/canvas-engine';
import { vector } from '@arekrado/vector-2d';

import { playerSystem } from './system/player';

import playerImg from './asset/player.png';
import carrotImg from './asset/carrot.png';

import tileCenter from './asset/tile-center.png';
import tileLeft from './asset/tile-left.png';
import tileRight from './asset/tile-right.png';
import tileTop from './asset/tile-top.png';
import tileTopLeft from './asset/tile-top-left.png';
import tileTopRight from './asset/tile-top-right.png';
import tileBottom from './asset/tile-bottom.png';
import tileBottomLeft from './asset/tile-bottom-left.png';
import tileBottomRight from './asset/tile-bottom-right.png';

import { playerBlueprint } from './blueprint/player';
import { tileBlueprint } from './blueprint/tile';
import { gameConfigurationBlueprint } from './blueprint/gameConfiguration';
import { carrotBlueprint } from './blueprint/carrot';

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state });
  // requestAnimationFrame(() => gameLogic(newState))

  // setTimeout(() => {
    requestAnimationFrame(() => gameLogic(newState));
  // }, 500);
};

const initializeScene = (state: State): State => {
  let newState = gameConfigurationBlueprint({
    state,
  });
  newState = playerBlueprint({ state: newState, position: vector(300, 300) });

  newState = [
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '1', '1', '0', '2', '2', '0', '0', '0', '0'],
    ['1', '1', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '0', '0', '1', '1', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
    ['1', '0', '0', '1', '1', '1', '1', '0', '1', '0'],
    ['1', '1', '1', '1', '0', '0', '1', '1', '1', '0'],
  ].reduce(
    (acc1, row, i) =>
      row.reduce((rowAcc, type, j) => {
        const position = vector(j * 48, -i * 48 + row.length * 48);
        switch (type) {
          case '1':
            return tileBlueprint({
              state: rowAcc,
              position,
              src: tileTop,
            });
          case '2':
            return carrotBlueprint({
              state: rowAcc,
              position,
            });
          default:
            return rowAcc;
        }
      }, acc1),
    newState
  );

  return newState;
};

const initializeAssets = (state: State): State =>
  [
    ['tileCenter', tileCenter],
    ['tileLeft', tileLeft],
    ['tileRight', tileRight],
    ['tileTop', tileTop],
    ['tileTopLeft', tileTopLeft],
    ['tileTopRight', tileTopRight],
    ['tileBottom', tileBottom],
    ['tileBottomLeft', tileBottomLeft],
    ['tileBottomRight', tileBottomRight],
    ['player', playerImg],
    ['carrot', carrotImg],
  ].reduce(
    (stateAcc, [name, src]) =>
      asset.addSprite({
        state: stateAcc,
        src,
        name,
      }),
    state
  );

initializeEngine().then(() => {
  console.info('Graphics source: https://ipixl.itch.io/');

  let state = initialState;

  state = initializeScene(state);
  state = initializeAssets(state);

  state = playerSystem(state);
  state = registerDebugSystem(state);

  gameLogic(state);
});

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools')
);
