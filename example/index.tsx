// import {
//   runOneFrame,
//   initialState,
//   initializeEngine,
//   asset,
//   Animation,
//   CollideBox,
//   componentName,
//   Guid,
//   Sprite,
//   Entity,
//   setComponent,
//   State,
//   Line,
//   defaultData,
//   setEntity,
//   getComponent,
//   generateEntity,
//   getEntity,
//   Rectangle,
//   Circle,
// } from '@arekrado/canvas-engine';
// import { vector } from '@arekrado/vector-2d';
// import playerImg from './asset/player.png';

// import reglCreator from 'regl';
// import { reglCamera } from './camera';
// // import { createDrawText } from './drawText';
// // import { createDrawCircle } from './drawCircle';
// import { createDrawLine } from './drawLine';
// import { createDrawSprite, loadTexture } from './drawSprite';
// import { createDrawRectangle } from './drawRectangle';
// import { createDrawCircle } from './drawCircle';
// import REGL from 'regl';

// const regl = reglCreator();

// const drawLine = createDrawLine(regl);
// const drawSprite = createDrawSprite(regl);
// const drawRectangle = createDrawRectangle(regl);
// const drawCircle = createDrawCircle(regl);

// const camera = reglCamera(regl, {
//   center: [0, 2.5, 0],
// });

// let state = initialState;

// const someEntity = generateEntity('someEntity', { position: vector(0, 0) });
// state = setEntity({ state, entity: someEntity });

// state = setComponent<Line>(componentName.line, {
//   state,
//   data: defaultData.line({
//     entityId: someEntity.id,
//     borderColor: [1, 0, 0, 1] as any,
//     path: [
//       vector(-0.3, 0.5),
//       vector(0.5, -0.5),
//       vector(-0.7, -0.7),
//       vector(0.9, -0.2),
//     ],
//   }),
// });

// state = setComponent<Sprite>(componentName.sprite, {
//   state,
//   data: defaultData.sprite({
//     entityId: someEntity.id,
//     src: playerImg,
//     anchor: vector(0.5, 0.5),
//     scale: vector(3, 3),
//   }),
// });

// state = setComponent<Rectangle>(componentName.rectangle, {
//   state,
//   data: defaultData.rectangle({
//     entityId: someEntity.id,
//     size: vector(0.8, 0.8),
//     fillColor: [1, 1, 0, 1],
//     // borderColor: [1, 0, 1, 1] as any,
//   }),
// });

// state = setComponent<Circle>(componentName.ellipse, {
//   state,
//   data: defaultData.ellipse({
//     entityId: someEntity.id,
//     size: [0.5, 0.5],
//     fillColor: [1, 0, 1, 1],
//   }),
// });

// loadTexture(playerImg, regl).then((playerTexture) => {
//   regl.frame((context: REGL.DefaultContext) => {
//     regl.clear({
//       color: [0.0, 0.0, 0.0, 1.0],
//       depth: 1,
//     });

//     camera(() => {
//       Object.values(state.component.line).forEach((line) => {
//         const entity = getEntity({ state, entityId: line.entityId });
//         entity &&
//           drawLine({
//             entity,
//             line,
//           });
//       });

//       Object.values(state.component.ellipse).forEach((ellipse) => {
//         const entity = getEntity({ state, entityId: ellipse.entityId });
//         entity &&
//           drawCircle({
//             entity,
//             ellipse,
//           });
//       });
//     });
//   });
// });
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

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state });
  // requestAnimationFrame(() => gameLogic(newState))

  // setTimeout(() => {
  requestAnimationFrame(() => gameLogic(newState));
  // }, 500);
};

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
    position: vector(300, 300),
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

console.info('Graphics source: https://ipixl.itch.io/');

let state = initializeEngine({ state: initialState });

state = initializeScene(state);
state = initializeAssets(state);

state = playerSystem(state);
state = registerDebugSystem(state);

gameLogic(state);

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools')
);
