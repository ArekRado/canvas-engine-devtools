import React, { useEffect, useReducer, useRef } from 'react'
import {
  AppAction,
  AppContext,
  initialState as appInitialState,
  reducer as appReducer,
} from './context/app'
import {
  ModalContext,
  initialState as modalInitialState,
  reducer as modalReducer,
} from './context/modal'
import { Button } from './common/Button'
import { SaveModal } from './modal/SaveModal'
import { Save } from 'react-feather'
import { eventBus } from '../util/eventBus'
import { State } from '@arekrado/canvas-engine'
import { useOutline } from '../../../src/util/useOutline'
import { AreaBottomMenu } from './AreaBottomMenu'

export const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState)

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState,
  )

  useEffect(() => {
    const callback = (payload: AppAction.SetGameState['payload']) => {
      appDispatch({
        type: 'SetGameState',
        payload,
      })
    }
    eventBus.on('syncUIWithGameState', callback)

    return () => {
      eventBus.remove('syncUIWithGameState', callback)
    }
  }, [])

  useEffect(() => {
    const callback = (payload: AppAction.SetSelectedArea['payload']) => {
      appDispatch({
        type: 'SetSelectedArea',
        payload,
      })
    }
    eventBus.on('showAreaMenu', callback)

    return () => {
      eventBus.remove('showAreaMenu', callback)
    }
  }, [])

  useOutline()

  return (
    <ModalContext.Provider value={{ ...modalState, dispatch: modalDispatch }}>
      <AppContext.Provider value={{ ...appState, dispatch: appDispatch }}>
        <div className="absolute w-full h-full">
          <AreaBottomMenu />
        </div>

        <SaveModal />
      </AppContext.Provider>
    </ModalContext.Provider>
  )
}
