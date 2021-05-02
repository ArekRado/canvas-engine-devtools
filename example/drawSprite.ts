// const regl = require('../regl')();
import { Line, Entity, Sprite } from '@arekrado/canvas-engine';
import REGL from 'regl';

export const loadTexture = (src: string, regl: any) =>
  new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(regl.texture(image));
    };
  });

type DrawSpriteProps = {
  sprite: Sprite;
  entity: Entity;
  texture: any;
};

type CreateDrawSprite = (regl: REGL.Regl) => (props: DrawSpriteProps) => void;

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
    
    uniform float rotation;
    uniform float viewportWidth;
    uniform float viewportHeight;
    uniform vec2 scale;
    uniform vec2 anchor;

    void main () {
      float aspect = viewportWidth / viewportHeight;
      vec2 anchoredPosition = position - anchor;

      uv = position;

      gl_Position = vec4(
        scale.x * (cos(rotation) * anchoredPosition.x - sin(rotation) * anchoredPosition.y),
        aspect * scale.y * (sin(rotation) * anchoredPosition.x + cos(rotation) * anchoredPosition.y),
        0,
        1.0
      );
    }`,

    attributes: {
      position: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    },

    uniforms: {
      viewportWidth: regl.context('viewportWidth'),
      viewportHeight: regl.context('viewportHeight'),

      texture: regl.prop<DrawSpriteProps, 'texture'>('texture'),
      scale: regl.prop<Entity, 'scale'>('scale'),
      rotation: regl.prop<Entity, 'rotation'>('rotation'),
      anchor: regl.prop<Sprite, 'anchor'>('anchor'),
    },

    primitive: 'triangles',
    count: 6,
  });

  return ({ entity, sprite, texture }) => {
    drawSprite({
      texture,
      scale: entity.scale,
      rotation: entity.rotation,
      anchor: sprite.anchor,
    });
  };
};
