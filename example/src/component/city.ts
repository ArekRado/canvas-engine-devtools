import { Component, Entity } from '@arekrado/canvas-engine'

export type City = Component<{
  unitProductionTimer: number
}>

export type GetDefaultComponent<X> = (
  params: Partial<Component<X>> & { entity: Entity },
) => X

export const defaultCity: GetDefaultComponent<City> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'city',
  unitProductionTimer: 0,
  ...data,
})
