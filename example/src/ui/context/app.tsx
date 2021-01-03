import {
  Entity,
  State,
  initialState as engineInitialState,
} from '@arekrado/canvas-engine'
import { createContext, Dispatch, Reducer } from 'react'
import { Action } from '../../type'

export type UIState = {
  selectedArea?: Entity
  gameState: State
}

export namespace AppAction {
  export type SetSelectedArea = Action<'SetSelectedArea', { entity: Entity }>
  export type SetGameState = Action<'SetGameState', State>
}

type AppActions = AppAction.SetSelectedArea | AppAction.SetGameState

type AppState = UIState & {
  dispatch: Dispatch<AppActions>
}

export const initialState: AppState = {
  selectedArea: undefined,
  gameState: engineInitialState,
  dispatch: () => {},
}

export const AppContext = createContext<AppState>(initialState)
export const reducer: Reducer<AppState, AppActions> = (state, action) => {
  switch (action.type) {
    case 'SetSelectedArea':
      return {
        ...state,
        selectedArea: action.payload.entity,
      }
    case 'SetGameState':
      return {
        ...state,
        gameState: action.payload,
      }
    default:
      return state
  }
}
