// const regl = require('../regl')();
import { Line, Entity, Sprite } from '@arekrado/canvas-engine';
import REGL from 'regl';

export const loadTexture = (src: string, regl: any) =>
  new Promise((resolve) => {
    let imageTexture;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(regl.texture(image));
    };

    return imageTexture;
  });

type CreateDrawLine = (
  regl: any
) => (params: {
  line: Line;
  entity: Entity;
  context: REGL.DefaultContext;
}) => void;
export const createDrawLine: CreateDrawLine = (regl) => {
  var lineWidth = 1;
  if (lineWidth > regl.limits.lineWidthDims[1]) {
    lineWidth = regl.limits.lineWidthDims[1];
  }

  const drawLine = regl({
    frag: `
    precision mediump float;
    uniform vec4 color;
    uniform float angle;

    void main() {
      gl_FragColor = color;
    }`,

    vert: `
      precision mediump float;
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1);
      }`,

    attributes: {
      position: regl.prop('path'),
      // position: path, //[line.path[0], line.path[1]],
    },
    uniforms: {
      color: [1, 0, 0, 1],
    },

    elements: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ],

    lineWidth: lineWidth,
    count: 2, // path.length?
  });

  return ({ entity, line }) => {
    // debugGraphics.lineStyle(line.borderWidth, line.borderColor, line.borderAlpha)
    // debugGraphics.drawPolygon(line.path)
    // debugGraphics.endFill()
    line.path.forEach((_, i) => {
      const path = [line.path[i], line.path[i + 1] || 0];
      drawLine({
        path,
      });
    });
  };
};

type CreateDrawSprite = (
  regl: any
) => (params: {
  sprite: Sprite;
  entity: Entity;
  playerTexture: any;
  context: REGL.DefaultContext;
}) => void;

export const createDrawSprite: CreateDrawSprite = (regl) => {
  const drawSprite = regl({
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1,
      },
      equation: {
        rgb: 'add',
        alpha: 'add',
      },
      color: [0, 0, 0, 0],
    },

    frag: `
    precision mediump float;
    uniform sampler2D texture;
    varying vec2 uv;
    
    void main () {
      gl_FragColor = texture2D(texture, uv);
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
    varying vec2 uv;
    uniform float angle;

    uniform float viewportWidth;
    uniform float viewportHeight;
    uniform vec2 scale;
    uniform vec2 anchor;

    void main () {
      float aspect = viewportWidth / viewportHeight;

      uv = position;

      vec2 anchoredPosition = position - anchor;

      gl_Position = vec4(
        scale.x * (cos(angle) * anchoredPosition.x - sin(angle) * anchoredPosition.y),
        aspect * scale.y * (sin(angle) * anchoredPosition.x + cos(angle) * anchoredPosition.y),
        0,
        1.0
      );
    }`,

    attributes: {
      position: [
        0, 0,
        1, 0,
        0, 1,

        0, 1,
        1, 0,
        1, 1,
      ],
    },

    uniforms: {
      // texture: regl.texture(playerTexture),
      texture: regl.prop('playerTexture'),
      angle: ({ tick }: any) => 0.01 * tick,

      viewportWidth: regl.context('viewportWidth'),
      viewportHeight: regl.context('viewportHeight'),
      scale: regl.prop('scale'),
      anchor: regl.prop('anchor'),
    },

    count: 6,
  });

  return ({ entity, sprite, playerTexture, context }) => {
    const x = entity.position[0] / context.viewportWidth;
    const y = entity.position[1] / context.viewportHeight;
    const w =
      (context.viewportWidth / context.viewportHeight) * entity.scale[0];
    const h = entity.scale[1];

    drawSprite({
      playerTexture,
      scale: entity.scale,
      anchor: sprite.anchor,
      // view: [
      //   x - 0.5 * w, //
      //   y - 0.5 * h,
      //   x + 0.5 * w,
      //   y + 0.5 * h,
      // ],
    });
  };
};
