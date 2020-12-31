import { Entity } from '@arekrado/canvas-engine'
import { createContext, Dispatch, Reducer } from 'react'
import { Action } from '../../type'

export type UIState = {
  selectedArea?: Entity
}

export namespace AppAction {
  export type SetSelectedArea = Action<'SetSelectedArea', { entity: Entity }>
}

type AppActions = AppAction.SetSelectedArea

type AppState = UIState & {
  dispatch: Dispatch<AppActions>
}

export const initialState: AppState = {
  selectedArea: undefined,
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
    default:
      return state
  }
}
