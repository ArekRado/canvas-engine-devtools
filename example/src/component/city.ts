import { Component, GetDefaultComponent, Guid } from '@arekrado/canvas-engine'

export type City = Component<{
  unitProductionTimer: number
  areaId: Guid
}>

export const defaultCity: GetDefaultComponent<City> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'city',
  unitProductionTimer: 0,
  ...data,
  areaId: data.areaId || '-',
})
