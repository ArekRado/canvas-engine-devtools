import { Color, Entity } from '@arekrado/canvas-engine';

export type Action<Type, Payload> = {
  type: Type;
  payload: Payload;
};

//
// Component
//
export type Debug = {
  isPlaying: boolean;
};

export type ColliderContour = {
  color: Color;
  colliderEntity: Entity;
};

export type RigidBodyContour = {
  rigidBodyEntity: Entity;
};
