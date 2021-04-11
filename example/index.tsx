import {
  runOneFrame,
  initialState,
  initializeEngine,
  asset,
  Animation,
  CollideBox,
  componentName,
  Guid,
  Sprite,
  Entity,
  setComponent,
  State,
  Line,
  defaultData,
  setEntity,
  getComponent,
  generateEntity,
  getEntity,
} from '@arekrado/canvas-engine';
import { vector } from '@arekrado/vector-2d';
import playerImg from './asset/player.png';

// Calling the regl module with no arguments creates a full screen canvas and
// WebGL context, and then uses this context to initialize a new REGL instance
import reglCreator from 'regl';
import { reglCamera } from './camera';
import { createDrawLine, createDrawSprite, loadTexture } from './draw';
import REGL from 'regl';

const regl = reglCreator();

const drawLine = createDrawLine(regl);
const drawSprite = createDrawSprite(regl);

const camera = reglCamera(regl, {
  center: [0, 2.5, 0],
});

let state = initialState;

const lineEntity = generateEntity('line');
const spriteEntity = generateEntity('sprite');

state = setEntity({ state, entity: lineEntity });
state = setEntity({ state, entity: spriteEntity });

state = setComponent<Line>(componentName.line, {
  state,
  data: defaultData.line({
    entityId: lineEntity.id,
    path: [
      vector(-0.3, 0.5),
      vector(0.5, -0.5),
      vector(-0.7, -0.7),
      vector(0.9, -0.2),
    ],
  }),
});

state = setComponent<Sprite>(componentName.sprite, {
  state,
  data: defaultData.sprite({
    entityId: spriteEntity.id,
    src: playerImg,
    anchor: vector(0.5, 0.5),
    scale: vector(3, 3),
  }),
});
// sprite.src
// 0.5 + -0.3, 0.5 + -0.5

const line = getComponent<Line>(componentName.line, {
  state,
  entityId: lineEntity.id,
});

// regl.texture(playerImg)

// // Calling regl() creates a new partially evaluated draw command
// const drawTriangle = regl({
//   // Shaders in regl are just strings.  You can use glslify or whatever you want
//   // to define them.  No need to manually create shader objects.
//   frag: `
//     precision mediump float;
//     uniform vec4 color;
//     void main() {
//       gl_FragColor = color;
//     }`,

//   vert: `
//     precision mediump float;
//     attribute vec2 position;
//     void main() {
//       gl_Position = vec4(position, 0, 1);
//     }`,

//   // Here we define the vertex attributes for the above shader
//   attributes: {
//     // regl.buffer creates a new array buffer object
//     position: regl.buffer([
//       [-2, -2], // no need to flatten nested arrays, regl automatically
//       [4, -2], // unrolls them into a typedarray (default Float32)
//       [4, 4],
//     ]),
//     // regl automatically infers sane defaults for the vertex attribute pointers
//   },

//   uniforms: {
//     // This defines the color of the triangle to be a dynamic variable
//     color: (regl.prop as any)('color'),
//   },

//   // This tells regl the number of vertices to draw in this command
//   count: 3,
// });

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
loadTexture(playerImg, regl).then((playerTexture) => {
  regl.frame((context: REGL.DefaultContext) => {
    // clear contents of the drawing buffer
    regl.clear({
      color: [0.0, 0.0, 0.0, 1.0],
      depth: 1,
    });

    camera(() => {
      // drawTriangle({
      //   // draw a triangle using the command defined above
      //   color: [
      //     Math.cos(time * 0.001),
      //     Math.sin(time * 0.0008),
      //     Math.cos(time * 0.003),
      //     1,
      //   ],
      // });

      Object.values(state.component.line).forEach((line) => {
        const entity = getEntity({ state, entityId: line.entityId });
        entity &&
          drawLine({
            entity,
            line,
            context,
          });
      });

      Object.values(state.component.sprite).forEach((sprite) => {
        const entity = getEntity({ state, entityId: sprite.entityId });
        entity &&
          drawSprite({
            entity,
            sprite,
            playerTexture,
            context,
          });
      });
    });
  });
});
// // import 'regenerator-runtime/runtime'
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { CanvasEngineDevtools, registerDebugSystem } from '../src/index';
// import '../src/styles.css';
// import {
//   runOneFrame,
//   State,
//   initialState,
//   initializeEngine,
//   asset,
//   generateEntity,
// } from '@arekrado/canvas-engine';
// import { vector } from '@arekrado/vector-2d';

// import { playerSystem } from './system/player';

// import playerImg from './asset/player.png';
// import carrotImg from './asset/carrot.png';

// import tileCenter from './asset/tile-center.png';
// import tileLeft from './asset/tile-left.png';
// import tileRight from './asset/tile-right.png';
// import tileTop from './asset/tile-top.png';
// import tileTopLeft from './asset/tile-top-left.png';
// import tileTopRight from './asset/tile-top-right.png';
// import tileBottom from './asset/tile-bottom.png';
// import tileBottomLeft from './asset/tile-bottom-left.png';
// import tileBottomRight from './asset/tile-bottom-right.png';

// import { playerBlueprint } from './blueprint/player';
// import { tileBlueprint } from './blueprint/tile';
// import { gameConfigurationBlueprint } from './blueprint/gameConfiguration';
// import { carrotBlueprint } from './blueprint/carrot';
// import { uiBlueprint } from './blueprint/ui';

// const gameLogic = (state: State) => {
//   const newState = runOneFrame({ state });
//   // requestAnimationFrame(() => gameLogic(newState))

//   // setTimeout(() => {
//   requestAnimationFrame(() => gameLogic(newState));
//   // }, 500);
// };

// const initializeScene = (state: State): State => {
//   const scoreCounterEntity = generateEntity('scoreCounter');

//   let newState = gameConfigurationBlueprint({
//     state,
//   });

//   newState = uiBlueprint({
//     state: newState,
//     scoreCounterEntity,
//   });

//   newState = playerBlueprint({
//     state: newState,
//     position: vector(300, 300),
//     scoreCounterId: scoreCounterEntity.id,
//   });

//   newState = [
//     ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
//     ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
//     ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
//     ['1', '1', '1', '0', '2', '2', '0', '0', '0', '0'],
//     ['1', '1', '0', '0', '0', '0', '0', '0', '0', '1'],
//     ['1', '1', '0', '0', '1', '1', '0', '0', '0', '1'],
//     ['1', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
//     ['1', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
//     ['1', '0', '0', '1', '1', '1', '1', '0', '1', '0'],
//     ['1', '1', '1', '1', '0', '0', '1', '1', '1', '0'],
//   ].reduce(
//     (acc1, row, i) =>
//       row.reduce((rowAcc, type, j) => {
//         const position = vector(j * 48, -i * 48 + row.length * 48);
//         switch (type) {
//           case '1':
//             return tileBlueprint({
//               state: rowAcc,
//               position,
//               src: tileTop,
//             });
//           case '2':
//             return carrotBlueprint({
//               state: rowAcc,
//               position,
//             });
//           default:
//             return rowAcc;
//         }
//       }, acc1),
//     newState
//   );

//   return newState;
// };

// const initializeAssets = (state: State): State =>
//   [
//     ['tileCenter', tileCenter],
//     ['tileLeft', tileLeft],
//     ['tileRight', tileRight],
//     ['tileTop', tileTop],
//     ['tileTopLeft', tileTopLeft],
//     ['tileTopRight', tileTopRight],
//     ['tileBottom', tileBottom],
//     ['tileBottomLeft', tileBottomLeft],
//     ['tileBottomRight', tileBottomRight],
//     ['player', playerImg],
//     ['carrot', carrotImg],
//   ].reduce(
//     (stateAcc, [name, src]) =>
//       asset.addSprite({
//         state: stateAcc,
//         src,
//         name,
//       }),
//     state
//   );

// initializeEngine().then(() => {
//   console.info('Graphics source: https://ipixl.itch.io/');

//   let state = initialState;

//   state = initializeScene(state);
//   state = initializeAssets(state);

//   state = playerSystem(state);
//   state = registerDebugSystem(state);

//   gameLogic(state);
// });

// ReactDOM.render(
//   <CanvasEngineDevtools />,
//   document.getElementById('canvas-engine-devtools')
// );
