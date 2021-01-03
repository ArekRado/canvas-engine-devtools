import { Component, Entity, GetDefaultComponent } from '@arekrado/canvas-engine'

export type Resource = Component<{
  type: 'wood' | 'stone' | 'gold'
}>

export const defaultResource: GetDefaultComponent<Resource> = ({
  entity,
  ...data
}) => ({
  entity,
  name: 'resource',
  type: 'wood',
  ...data,
})
