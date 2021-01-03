import { Component, GetDefaultComponent } from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

export type Unit = Component<{
  target: null | Vector2D
  health: number
  maxHealth: number
}>

export const defaultUnit: GetDefaultComponent<Unit> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'unit',
  target: null,
  health: 1,
  maxHealth: 1,
  ...data,
})
