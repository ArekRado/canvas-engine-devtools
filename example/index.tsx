// import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CanvasEngineDevtools, registerDebugSystem } from '../src/index'
import '../src/styles.css'
import {
  runOneFrame,
  State,
  initialState,
  initializeEngine,
  asset,
} from '@arekrado/canvas-engine'
import { vector } from '@arekrado/vector-2d'

import { playerSystem } from './system/player'

import playerImg from './asset/player.png'

import tileCenter from './asset/tile-center.png'
import tileLeft from './asset/tile-left.png'
import tileRight from './asset/tile-right.png'
import tileTop from './asset/tile-top.png'
import tileTopLeft from './asset/tile-top-left.png'
import tileTopRight from './asset/tile-top-right.png'
import tileBottom from './asset/tile-bottom.png'
import tileBottomLeft from './asset/tile-bottom-left.png'
import tileBottomRight from './asset/tile-bottom-right.png'

import { playerBlueprint } from './blueprint/player'
import { tileBlueprint } from './blueprint/tile'
import { gameConfigurationBlueprint } from './blueprint/gameConfiguration'

const gameLogic = (state: State) => {
  const newState = runOneFrame({ state })

  requestAnimationFrame(() => gameLogic(newState))
}

const initializeScene = (state: State): State => {
  const v1 = gameConfigurationBlueprint({
    state,
  })
  const v2 = playerBlueprint({ state: v1, position: vector(300, 300) })

  const v3 = [
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '1', '1', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '1', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '0', '0', '1', '1', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
    ['1', '0', '0', '1', '1', '1', '1', '0', '1', '0'],
    ['1', '1', '1', '1', '0', '0', '1', '1', '1', '0'],
  ].reduce(
    (acc1, row, i) =>
      row.reduce((rowAcc, img, j) => {
        return img === '1'
          ? tileBlueprint({
              state: rowAcc,
              position: vector(j * 48, -i * 48 + row.length * 48),
              src: tileTop,
            })
          : rowAcc
      }, acc1),
    v2,
  )

  return v3
}

const initializeAssets = (state: State): State =>
  [
    ['tileCenter', tileCenter],
    ['tileLeft', tileLeft],
    ['tileRight', tileRight],
    ['tileTop', tileTop],
    ['tileTopLeft', tileTopLeft],
    ['tileTopRight', tileTopRight],
    ['tileBottom', tileBottom],
    ['tileBottomLeft', tileBottomLeft],
    ['tileBottomRight', tileBottomRight],
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
  console.info('Graphics source: https://ipixl.itch.io/')

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
