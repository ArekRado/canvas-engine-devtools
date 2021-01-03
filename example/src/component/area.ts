import { Component, Entity, GetDefaultComponent } from '@arekrado/canvas-engine'

export type Area = Component<{
  size: number
  isSelected: boolean
  resources: Entity[]
  units: Entity[]
}>

export const defaultArea: GetDefaultComponent<Area> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'area',
  size: 0,
  isSelected: false,
  resources: [],
  units: [],
  ...data,
})
