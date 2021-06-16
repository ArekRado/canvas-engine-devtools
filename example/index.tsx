// // import 'regenerator-runtime/runtime'
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
  generateEntity,
  setCamera,
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
import { uiBlueprint } from './blueprint/ui';

const gameLogic = async (state: State) => {
  const newState = await runOneFrame({ state });

  // setTimeout(() => {
  requestAnimationFrame(() => {
    gameLogic(newState);
    // state.regl?.frame(() => runOneFrame({ state }));
  });
  // },10000);
};

// const gameLogic = (state: State) => {
//   // state.regl?.frame(() => runOneFrame({ state }));
//   runOneFrame({ state });
// };

const initializeScene = (state: State): State => {
  const scoreCounterEntity = generateEntity('scoreCounter');

  let newState = gameConfigurationBlueprint({
    state,
  });

  newState = uiBlueprint({
    state: newState,
    scoreCounterEntity,
  });

  newState = playerBlueprint({
    state: newState,
    position: vector(0, 1),
    scoreCounterId: scoreCounterEntity.id,
  });

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
        const position = vector(j * 1, -i * 1 + row.length * 1);
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

console.info('Graphics source: https://ipixl.itch.io/');

let state = initializeEngine({ state: initialState });

state = initializeScene(state);
state = initializeAssets(state);

// state = playerSystem(state);
state = registerDebugSystem(state);

state = setCamera({ state, camera: { position: [5, 5], size: 10 } });

gameLogic(state);

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools')
);
// debugger;
