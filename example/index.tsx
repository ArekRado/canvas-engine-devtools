import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, registerDebugSystem } from '../src/index'
import {
  runOneFrame,
  State,
  initialState,
  initializeEngine,
  asset,
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

const throttleXD = (x: any): any => {
  setTimeout(() => x(), 200)
}

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })
  throttleXD(() => {
    requestAnimationFrame(() => gameLogic(newState))
  })
}

const initializeScene = (state: State): State => {
  const v1 = cityBlueprint({ state, position: vector(100, 100) })
  const v2 = cityBlueprint({ state: v1, position: vector(300, 300) })
  // const v2 = porterBlueprint({
  //   state: v1,
  //   position: vectorZero(),
  //   target: vector(400, 4000),
  // })

  console.log(v2)


  return v2
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


  gameLogic(registerDebugSystem(v6))
})

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools'),
)
