import { Component } from '@arekrado/canvas-engine';

export type Action<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type Debug = Component<{
  isPlaying: boolean;
}>;
