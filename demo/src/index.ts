import { getState } from './getState';
// import { emitEvent } from './eventSystem';

import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { runOneFrame } from '@arekrado/canvas-engine';

const canvas = document.getElementById('game') as HTMLCanvasElement;
export const humanPlayerEntity = 'humanPlayer';

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
  new Vector3(0, 0, -1),
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

if (state.babylonjs.sceneRef) {
  const beforeRenderCallback = () => {
    state = runOneFrame({ state });
  };

  state.babylonjs.sceneRef.registerBeforeRender(beforeRenderCallback);
}

// Resize
// window.addEventListener('resize', () => {
//   emitEvent<CameraEvent.ResizeEvent>({
//     type: CameraEvent.Type.resize,
//     payload: {},
//   });

engine.resize();
// });
