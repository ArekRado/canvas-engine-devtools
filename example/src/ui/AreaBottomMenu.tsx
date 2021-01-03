import React, { useContext } from 'react'
import { Button } from './common/Button'
import { AppContext } from './context/app'

export const AreaBottomMenu: React.FC = () => {
  const appState = useContext(AppContext)

  if (appState.selectedArea) {
    return (
      <div className="grid grid-cols-1">
        <div>{appState.selectedArea ? 'AreaBottomMenu' : '-'}</div>

        <div>
          <Button>Build</Button>
          <Button>Unit</Button>
          <Button>Manage</Button>
        </div>
      </div>
    )
  } else {
    return null
  }
}
