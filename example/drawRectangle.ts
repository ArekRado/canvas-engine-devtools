// const regl = require('../regl')();
import { Rectangle, Entity, Sprite } from '@arekrado/canvas-engine';
import REGL from 'regl';
import { createDrawLineCommand } from './drawLine';

type CreateDrawRectangle = (
  regl: REGL.Regl
) => (params: { rectangle: Rectangle; entity: Entity }) => void;
export const createDrawRectangle: CreateDrawRectangle = (regl) => {
  const drawLine = createDrawLineCommand(regl);

  return ({ entity, rectangle }) => {
    const size = rectangle.size;

    const vert = [
      [entity.position[0], entity.position[1]],
      [entity.position[0] + size[0], entity.position[1]],
      [entity.position[0] + size[0], entity.position[1] + size[1]],
      [entity.position[0], entity.position[1] + size[0]],
    ];

    // borders
    drawLine({
      path: [vert[0], vert[1]],
      borderColor: rectangle.borderColor,
    });
    drawLine({
      path: [vert[1], vert[2]],
      borderColor: rectangle.borderColor,
    });
    drawLine({
      path: [vert[2], vert[3]],
      borderColor: rectangle.borderColor,
    });
    drawLine({
      path: [vert[3], vert[0]],
      borderColor: rectangle.borderColor,
    });
  };
};