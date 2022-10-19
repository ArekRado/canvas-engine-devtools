import { getState } from './getState';
// import { Engine } from '../../node_modules/@babylonjs/core/Engines/engine';
// import { Scene } from '../../node_modules/@babylonjs/core/scene';
// import { UniversalCamera } from '../../node_modules/@babylonjs/core/Cameras/universalCamera';
// import { Vector3 } from '../../node_modules/@babylonjs/core/Maths/math.vector';
// import { Camera } from '../../node_modules/@babylonjs/core/Cameras/camera';
// import { HemisphericLight } from '../../node_modules/@babylonjs/core/Lights/hemisphericLight';
// import { Color3 } from '../../node_modules/@babylonjs/core/Maths/math.color';
import {
  cameraEntity,
  runRenderLoop,
  updateCamera,
} from '../../node_modules/@arekrado/canvas-engine';
import {
  Scene,
  WebGLRenderer,
  BoxGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
} from '../../node_modules/Three';

const canvas = document.getElementById('game') as HTMLCanvasElement;

// // Engine
// const engine = new Engine(canvas, true, {
//   preserveDrawingBuffer: true,
//   stencil: true,
//   disableWebGL2Support: false,
// });

// // Scene
// const scene = new Scene(engine);
// // scene.debugLayer.show();
// engine.runRenderLoop(() => {
//   if (scene && scene.activeCamera) {
//     scene.render();
//   }
// });

// // Camera
// const camera = new UniversalCamera(
//   'UniversalCamera',
//   new Vector3(0, 0, -10),
//   scene
// );
// camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

// // Light
// export const light = new HemisphericLight('light', new Vector3(0, 0, 1), scene);
// light.intensity = 1;

// light.diffuse = new Color3(1, 1, 1);
// light.specular = new Color3(1, 1, 1);
// light.groundColor = new Color3(1, 1, 1);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes = []; // just an array we can use to rotate the cubes
const loader = new TextureLoader();

const materials = [
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-1.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-2.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-3.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-4.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-5.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-6.jpg'
    ),
  }),
];
const cube = new Mesh(geometry, materials);
scene.add(cube);
cubes.push(cube);

cube.position.x = 2;
cube.position.y = 1.8;
cube.position.z = 0;

let state = getState({
  scene,
  renderer,
});

state = updateCamera({
  state,
  entity: cameraEntity,
  update: () => ({
    position: [0, 0, 15],
    lookAt: [0, 0, 0],
    // fov: 75,
    // aspect: 2,
    // near: 0.1,
    // far: 5,
  }),
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

// engine.resize();
// });
