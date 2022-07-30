import { getState } from './getState';
import { Engine } from '../../node_modules/@babylonjs/core/Engines/engine';
import { Scene } from '../../node_modules/@babylonjs/core/scene';
import { UniversalCamera } from '../../node_modules/@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '../../node_modules/@babylonjs/core/Maths/math.vector';
import { Camera } from '../../node_modules/@babylonjs/core/Cameras/camera';
import { HemisphericLight } from '../../node_modules/@babylonjs/core/Lights/hemisphericLight';
import { Color3 } from '../../node_modules/@babylonjs/core/Maths/math.color';
import { runRenderLoop } from '../../node_modules/@arekrado/canvas-engine';

const canvas = document.getElementById('game') as HTMLCanvasElement;

// Engine
const engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  disableWebGL2Support: false,
});

// Scene
const scene = new Scene(engine);
// scene.debugLayer.show();
engine.runRenderLoop(() => {
  if (scene && scene.activeCamera) {
    scene.render();
  }
});

// Camera
const camera = new UniversalCamera(
  'UniversalCamera',
  new Vector3(0, 0, -10),
  scene
);
camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

// Light
export const light = new HemisphericLight('light', new Vector3(0, 0, 1), scene);
light.intensity = 1;

light.diffuse = new Color3(1, 1, 1);
light.specular = new Color3(1, 1, 1);
light.groundColor = new Color3(1, 1, 1);

let state = getState({
  scene,
  camera,
});

// let timeout: number = -1;

// const beforeRenderCallback = () => {
//   state = runOneFrame({ state });
//   (state as any).animationFrame =
//     window.requestAnimationFrame(beforeRenderCallback);
// };

// timeout = window.requestAnimationFrame(() => {
//   beforeRenderCallback();
// });

runRenderLoop({ state });

// Resize
// window.addEventListener('resize', () => {
//   emitEvent<CameraEvent.ResizeEvent>({
//     type: CameraEvent.Type.resize,
//     payload: {},
//   });

engine.resize();
// });
