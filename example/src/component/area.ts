import { Component, Entity } from '@arekrado/canvas-engine'

export type Area = Component<{
  size: number
  isSelected: boolean
}>

export type GetDefaultComponent<X> = (
  params: Partial<Component<X>> & { entity: Entity },
) => X

export const defaultArea: GetDefaultComponent<Area> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'area',
  size: 0,
  isSelected: false,
  ...data,
})
