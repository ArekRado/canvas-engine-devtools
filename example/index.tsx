import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, registerDebugSystem } from '../src/index'
import { App } from './src/ui/App'
import {
  runOneFrame,
  State,
  initialState,
  initializeEngine,
  asset,
  generateEntity,
  setComponent,
  setEntity,
} from '@arekrado/canvas-engine'
import { vector } from '@arekrado/vector-2d'

import { areaSystem } from './src/system/area'
import { porterSystem } from './src/system/porter'
import { citySystem } from './src/system/city'

import { cityBlueprint } from './src/blueprint/city'

import areaImg from './src/asset/area.png'
import areaActiveImg from './src/asset/area-active.png'
import porterImg from './src/asset/porter.png'
import cityImg from './src/asset/city.png'
import { eventBus } from './src/util/eventBus'
import { unitSystem } from './src/system/unit'
import { defaultUser } from './src/component/user'
import { userId } from './src/util/variables'
import { userSystem } from './src/system/user'

const throttleXD = (x: any): any => {
  setTimeout(() => x(), 40)
}

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })
  eventBus.dispatch('syncUIWithGameState', newState)

  throttleXD(() => {
    requestAnimationFrame(() => gameLogic(newState))
  })
}

const initializeScene = (state: State): State => {
  const userEntity = generateEntity('user')

  // User
  const v1 = setEntity({ state, entity: userEntity })
  userId = userEntity.id
  const v2 = setComponent('user', {
    state: v1,
    data: defaultUser({ entity: userEntity }),
  })

  // Areas
  const v3 = cityBlueprint({ state: v2, position: vector(100, 100) })
  const v4 = cityBlueprint({ state: v3, position: vector(300, 300) })

  // const v2 = porterBlueprint({
  //   state: v1,
  //   position: vectorZero(),
  //   target: vector(400, 4000),
  // })

  return v4
}

const initializeAssets = (state: State): State =>
  [
    ['area', areaImg],
    ['area-active', areaActiveImg],
    ['porter', porterImg],
    ['city', cityImg],
  ].reduce(
    (acc, [name, src]) =>
      asset.addSprite({
        state: acc,
        src,
        name,
      }),
    state,
  )

initializeEngine().then(() => {
  const v1 = initialState

  const v2 = initializeScene(v1)
  const v3 = initializeAssets(v2)

  const v4 = areaSystem(v3)
  const v5 = porterSystem(v4)
  const v6 = citySystem(v5)
  const v7 = userSystem(v6)
  const v8 = unitSystem(v7)
  const v9 = registerDebugSystem(v8)

  gameLogic(v9)
})

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools'),
)

ReactDOM.render(<App />, document.getElementById('canvas-engine'))
