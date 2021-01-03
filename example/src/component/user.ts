import { Component, GetDefaultComponent, Guid } from '@arekrado/canvas-engine'

export type User = Component<{
  action: null | 'moveUnits' | 'idle' 
  selectedAreaId?: Guid
}>

export const defaultUser: GetDefaultComponent<User> = ({ entity }) => ({
  entity,
  name: 'user',
  action: 'idle',
})
