import React, { useContext } from 'react'
import { Entity, getComponent } from '@arekrado/canvas-engine'
import { useState } from 'react'
import { Button } from './common/Button'
import { AppContext } from './context/app'
import { Area } from '../component/area'
import { eventBus } from '../util/eventBus'
import { userId } from '../util/variables'
import { User } from '../component/user'

export const AreaBottomMenu: React.FC = () => {
  const { gameState } = useContext(AppContext)
  const [menu, setMenu] = useState<'build' | 'unit' | 'manage' | null>(null)

  const user = getComponent<User>('user', {
    state: gameState,
    entity: { id: userId } as Entity,
  })

  if (!user) {
    return null
  }

  const { selectedAreaId } = user

  if (selectedAreaId) {
    const area = getComponent<Area>('area', {
      state: gameState,
      entity: { id: selectedAreaId } as Entity,
    })

    if (!area) {
      return null
    }

    return (
      <div className="grid grid-cols-1">
        <div>{selectedAreaId ? 'AreaBottomMenu' : '-'}</div>

        {menu === 'unit' && (
          <div>
            <Button
              onClick={() => eventBus.dispatch('setUserAction', 'moveUnits')}
            >
              Move
            </Button>

            {area.units.map((x) => x)}
          </div>
        )}

        <div>
          <Button onClick={() => setMenu('build')}>Build</Button>
          <Button onClick={() => setMenu('unit')}>Unit</Button>
          <Button onClick={() => setMenu('manage')}>Manage</Button>
        </div>
      </div>
    )
  } else {
    return null
  }
}
