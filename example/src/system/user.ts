import {
  Component,
  createSystem,
  State,
  setComponent,
} from '@arekrado/canvas-engine'
import { User } from '../component/user'
import { eventBus } from '../util/eventBus'

let action: User['action'] = 'idle'

eventBus.on('setUserAction', (data) => {
  action = data
})

export const userSystem = (state: State) =>
  createSystem<Component<User>>({
    name: 'user',
    state,
    tick: ({ state, component }) => {
      return setComponent('user', {
        state,
        data: {
          ...component,
          action,
        },
      })
    },
  })
