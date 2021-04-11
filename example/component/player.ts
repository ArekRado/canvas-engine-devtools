import { Component, GetDefaultComponent, Guid } from '@arekrado/canvas-engine'
import { Vector2D, vectorZero } from '@arekrado/vector-2d'
import { gameComponentName } from '../util/gameComponentName'

export type Player = Component<{
  jumpVelocity: Vector2D
  fallVelocity: Vector2D
  isJumping: boolean

  leftCollideId: Guid
  rightCollideId: Guid
  topCollideId: Guid
  bottomCollideId: Guid
  scoreCounterId: Guid
}>

export const defaultPlayer: GetDefaultComponent<Player> = ({
  entityId,
  ...data
}) => ({
  entityId,
  name: gameComponentName.player,
  jumpVelocity: vectorZero(),
  fallVelocity: vectorZero(),
  isJumping: false,
  leftCollideId: '',
  rightCollideId: '',
  topCollideId: '',
  bottomCollideId: '',
  scoreCounterId: '',
  ...data,
})
