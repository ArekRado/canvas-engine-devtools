import { Mouse, CollideCircle } from '@arekrado/canvas-engine'
import { magnitude, sub } from '@arekrado/vector-2d'

export type IsMouseOver = (params: {
  mouse: Mouse
  collideCircle: CollideCircle
}) => boolean
export const isMouseOver = ({ mouse, collideCircle }) => {
  const distance = magnitude(sub(mouse.position, collideCircle.position))

  return distance <= collideCircle.radius
}
