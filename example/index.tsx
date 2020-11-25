import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, registerDebugSystem } from '../src/index'
import {
  runOneFrame,
  State,
  initialState,
  initialize,
  asset,
} from '@arekrado/canvas-engine'
import exampleImage from './example.png'

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })
  requestAnimationFrame(() => gameLogic(newState))
}
initialize().then(() => {
  const v1 = registerDebugSystem(initialState)

  gameLogic(
    asset.addSprite({
      state: v1,
      src: exampleImage,
      name: 'example',
    }),
  )
})

ReactDOM.render(
  <CanvasEngineDevtools />,
  document.getElementById('canvas-engine-devtools'),
)
