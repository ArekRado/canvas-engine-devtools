import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, update as debugSystemUpdate } from '../src/index'
import {
  runOneFrame,
  State,
  initialState,
  initialize,
  addSprite,
} from '@arekrado/canvas-engine'
import exampleImage from './example.png'

const App = () => <CanvasEngineDevtools />

ReactDOM.render(<App />, document.getElementById('canvas-engine-devtools'))

const gameLogic = (state: State) => {
  const v1 = runOneFrame({ state, enableDraw: true })
  const v2 = debugSystemUpdate({ state: v1 })
  requestAnimationFrame(() => gameLogic(v2))
}

initialize()
gameLogic(
  addSprite({ state: initialState, src: exampleImage, name: 'example' }),
)
