import { Component, GetDefaultComponent } from '@arekrado/canvas-engine'

export type City = Component<{
  unitProductionTimer: number
}>

export const defaultCity: GetDefaultComponent<City> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'city',
  unitProductionTimer: 0,
  ...data,
})
