import {
  addEventHandler,
  Component,
  createComponent,
  Dictionary,
  EmptyState,
  getState as getCanvaasEngineState,
  setEntity,
} from '../../node_modules/@arekrado/canvas-engine';
import { Scene } from '@babylonjs/core/scene';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { State } from './type';
import { debugSystem } from '../../src/index';
import { eventHandler } from './eventHandler';
import jsonState from './state.json';

export const getState = ({
  scene,
  camera,
}: {
  scene?: Scene;
  camera?: UniversalCamera;
}): State => {
  let state = getCanvaasEngineState<State>({
    scene,
    camera,
    Vector3,
    StandardMaterial,
    MeshBuilder,
    Texture,
    Color3,
  }) as State;

  const exampleData: EmptyState<Dictionary<Component<any>>, []> = jsonState as any;

  Object.values(exampleData.component).forEach((components) => {
    Object.values(components).forEach((component: Component<any>) => {
      state = setEntity({ entity: component.entity, state });
      state = createComponent({ state, data: component });
    });
  });

  addEventHandler(eventHandler);

  // state = boxSystem(state);
  // state = aiSystem(state);
  // state = gameSystem(state);
  // state = markerSystem(state);
  // state = backgroundSystem(state);
  // state = logoSystem(state);

  state = debugSystem(state, 'devtools') as State;

  return state;
};
