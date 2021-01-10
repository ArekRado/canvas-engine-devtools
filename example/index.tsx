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

import { playerSystem } from './src/system/player'

import shadowImg from './src/asset/shadow.png'
import playerImg from './src/asset/player.png'
import { playerBlueprint } from './src/blueprint/player'
import { tileBlueprint } from './src/blueprint/tile'

const throttleXD = (x: any): any => {
  setTimeout(() => x(), 0)
}

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })

  throttleXD(() => {
    requestAnimationFrame(() => gameLogic(newState))
  })
}

const initializeScene = (state: State): State => {
  const v1 = playerBlueprint({ state: state, position: vector(300, 300) })

  const v2 = tileBlueprint({ state: v1, position: vector(300, 400) })
  const v3 = tileBlueprint({ state: v2, position: vector(350, 400) })
  const v4 = tileBlueprint({ state: v3, position: vector(400, 400) })
  const v5 = tileBlueprint({ state: v4, position: vector(450, 400) })
  const v6 = tileBlueprint({ state: v5, position: vector(450, 350) })
  const v7 = tileBlueprint({ state: v6, position: vector(500, 350) })
  const v8 = tileBlueprint({ state: v7, position: vector(550, 350) })

  // const v2 = playerBlueprint({
  //   state: v1,
  //   position: vectorZero(),
  //   target: vector(400, 4000),
  // })

  return v8
}

const initializeAssets = (state: State): State =>
  [
    ['shadow', shadowImg],
    ['player', playerImg],
  ].reduce(
    (stateAcc, [name, src]) =>
      asset.addSprite({
        state: stateAcc,
        src,
        name,
      }),
    state,
  )

initializeEngine().then(() => {
  const v1 = initialState

  const v2 = initializeScene(v1)
  const v3 = initializeAssets(v2)

  const v4 = playerSystem(v3)
  const v5 = registerDebugSystem(v4)

  gameLogic(v5)
})

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools'),
)
