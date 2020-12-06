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
import exampleImage from './src/asset/example.png'
import { areaSystem } from './src/system/area'
import { areaBlueprint } from './src/blueprint/area'
import { vectorZero } from '@arekrado/vector-2d'

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })
  requestAnimationFrame(() => gameLogic(newState))
}

const initializeScene = (state: State): State => {
  const v1 = areaBlueprint({ state, position: vectorZero() })

  return v1
}

initializeEngine().then(() => {
  const v1 = initialState

  const v2 = asset.addSprite({
    state: v1,
    src: exampleImage,
    name: 'example',
  })

  const v3 = areaSystem(v2)

  const v4 = initializeScene(v3)

  gameLogic(registerDebugSystem(v4))
})

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools'),
)
