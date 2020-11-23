import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, update as debugSystemUpdate } from '../src/index'
import {
  runOneFrame,
  State,
  initialState,
  initialize,
  asset,
} from '@arekrado/canvas-engine'
import exampleImage from './example.png'

const App = () => <CanvasEngineDevtools />

ReactDOM.render(<App />, document.getElementById('canvas-engine-devtools'))

const gameLogic = (state: State) => {
  const v1 = runOneFrame({ state })
  const v2 = debugSystemUpdate({ state: v1 })
  requestAnimationFrame(() => gameLogic(v2))
}

initialize()
gameLogic(
  asset.addSprite({
    state: { ...initialState, isDrawEnabled: true },
    src: exampleImage,
    name: 'example',
  }),
)
