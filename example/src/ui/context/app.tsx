import {
  State,
  initialState as engineInitialState,
} from '@arekrado/canvas-engine'
import { createContext, Dispatch, Reducer } from 'react'
import { Action } from '../../type'

export type UIState = {
  gameState: State
}

export namespace AppAction {
  export type SetGameState = Action<'SetGameState', State>
}

type AppActions = AppAction.SetGameState

type AppState = UIState & {
  dispatch: Dispatch<AppActions>
}

export const initialState: AppState = {
  gameState: engineInitialState,
  dispatch: () => {},
}

export const AppContext = createContext<AppState>(initialState)
export const reducer: Reducer<AppState, AppActions> = (state, action) => {
  switch (action.type) {
    case 'SetGameState':
      return {
        ...state,
        gameState: action.payload,
      }
    default:
      return state
  }
}
