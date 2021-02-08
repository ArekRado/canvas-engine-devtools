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

import playerImg from './src/asset/player.png'

import tileCenter from './src/asset/tile-center.png'
import tileLeft from './src/asset/tile-left.png'
import tileRight from './src/asset/tile-right.png'
import tileTop from './src/asset/tile-top.png'
import tileTopLeft from './src/asset/tile-top-left.png'
import tileTopRight from './src/asset/tile-top-right.png'
import tileBottom from './src/asset/tile-bottom.png'
import tileBottomLeft from './src/asset/tile-bottom-left.png'
import tileBottomRight from './src/asset/tile-bottom-right.png'

import { playerBlueprint } from './src/blueprint/player'
import { tileBlueprint } from './src/blueprint/tile'
import { gameConfigurationBlueprint } from './src/blueprint/gameConfiguration'

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
    {
      position: vector(300, 200),
      src: tileTop,
    },
    {
      position: vector(348, 200),
      src: tileTop,
    },
    {
      position: vector(396, 200),
      src: tileTop,
    },
    {
      position: vector(444, 200),
      src: tileTop,
    },
    {
      position: vector(444, 248),
      src: tileTop,
    },
    {
      position: vector(492, 248),
      src: tileTop,
    },
    {
      position: vector(540, 248),
      src: tileTop,
    },
    {
      position: vector(540, 296),
      src: tileTop,
    },
    {
      position: vector(540, 344),
      src: tileTop,
    },
  ].reduce(
    (acc, element) =>
      tileBlueprint({
        state: acc,
        position: element.position,
        src: element.src,
      }),
    v2,
  )

  // const v2 = playerBlueprint({
  //   state: v1,
  //   position: vectorZero(),
  //   target: vector(400, 4000),
  // })

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
