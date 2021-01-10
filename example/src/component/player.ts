import { Component, GetDefaultComponent, Guid } from '@arekrado/canvas-engine'
import { Vector2D, vectorZero } from '@arekrado/vector-2d'

export type Player = Component<{
  shadowId: Guid
  jumpVelocity: Vector2D
  fallVelocity: Vector2D
  isJumping: boolean
}>

export const defaultPlayer: GetDefaultComponent<Player> = ({
  entityId,
  ...data
}) => ({
  entityId,
  name: 'player',
  shadowId: '',
  jumpVelocity: vectorZero(),
  fallVelocity: vectorZero(),
  isJumping: false,
  ...data,
})
