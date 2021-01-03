import { Component, GetDefaultComponent } from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

export type Porter = Component<{
  target: null | Vector2D
}>

export const defaultPorter: GetDefaultComponent<Porter> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'porter',
  target: null,
  ...data,
})
