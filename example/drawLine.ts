import { Line, Entity } from '@arekrado/canvas-engine';
import { Vector2D } from '@arekrado/vector-2d';
import REGL from 'regl';

export const createDrawLineCommand = (regl: REGL.Regl) => {
  var lineWidth = 1;
  if (lineWidth > regl.limits.lineWidthDims[1]) {
    lineWidth = regl.limits.lineWidthDims[1];
  }

  return regl({
    frag: `
    precision mediump float;
    uniform vec4 borderColor;

    void main() {
      gl_FragColor = borderColor;
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;

    uniform float viewportWidth;
    uniform float viewportHeight;

    void main() {
      float aspect = viewportWidth / viewportHeight;

      gl_Position = vec4(position.x, aspect * position.y, 0, 1);
    }`,

    attributes: {
      position: regl.prop<{ path: [Vector2D, Vector2D] }, 'path'>('path'),
    },
    uniforms: {
      viewportWidth: regl.context('viewportWidth'),
      viewportHeight: regl.context('viewportHeight'),

      borderColor: regl.prop<Line, 'borderColor'>('borderColor'),
    },
    lineWidth: lineWidth,
    count: 2,
    primitive: 'line loop',
  });
};

type DrawLineProps = {
  line: Line;
  entity: Entity;
};

type CreateDrawLine = (regl: REGL.Regl) => (params: DrawLineProps) => void;
export const createDrawLine: CreateDrawLine = (regl) => {
  const drawLine = createDrawLineCommand(regl);

  return ({ entity, line }) => {
    line.path.forEach((_, i) => {
      const path = [line.path[i], line.path[i + 1] || 0];
      drawLine({
        path,
        borderColor: line.borderColor,
      });
    });
  };
};
