import { Component, Entity } from '@arekrado/canvas-engine'
import { Vector2D } from '@arekrado/vector-2d'

export type Porter = Component<{
  target: null | Vector2D
}>

export type GetDefaultComponent<X> = (
  params: Partial<Component<X>> & { entity: Entity },
) => X

export const defaultPorter: GetDefaultComponent<Porter> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'porter',
  target: null,
  ...data,
})
