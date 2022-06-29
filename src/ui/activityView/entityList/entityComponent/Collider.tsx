import { Collider as ColliderType, getEntity } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { doNothing } from '../../../../util/doNothing';
import { EntityButton } from '../../../common/EntityButton';
import { Input } from '../../../common/Input';
import { Vector } from '../../../common/Vector';
import { useAppState } from '../../../hooks/useAppState';
import { sprinkles } from '../../../util.css';

type ColliderProps = {
  component: ColliderType;
};
export const Collider: React.FC<ColliderProps> = ({ component }) => {
  const appState = useAppState();

  // const setColliderData = (data: Partial<ColliderType>): void =>
  //   appState.dispatch({
  //     type: 'SetColliderComponent',
  //     payload: {
  //       ...component,
  //       ...data,
  //     },
  //   });

  return (
    <div className={sprinkles({ display: 'flex', flexDirection: 'column' })}>
      {component.layers.map((value, index) => (
        <Input
          key={index}
          label="layers"
          name="layers"
          containerClassName={sprinkles({ display: 'flex' })}
          labelClassName={sprinkles({ flex: '1' })}
          inputClassName={sprinkles({ flex: '1' })}
          id="layers"
          value={value}
          onChange={doNothing}
        />
      ))}

      {component.data.map((collider, index) => (
        <React.Fragment>
          {collider.type === 'circle' && (
            <div>
              <div
                className={sprinkles({
                  marginBottom: '8x',
                  color: 'white',
                })}
              >
                Circle
              </div>

              <Input
                key={index}
                label="radius"
                name="radius"
                containerClassName={sprinkles({ display: 'flex' })}
                labelClassName={sprinkles({ flex: '1' })}
                inputClassName={sprinkles({ flex: '1' })}
                id="radius"
                value={collider.radius}
                onChange={doNothing}
              />

              <Vector
                label="position"
                name="position"
                containerClassName={sprinkles({ display: 'flex' })}
                labelClassName={sprinkles({ flex: '1' })}
                inputClassName={sprinkles({ flex: '1' })}
                id="position"
                value={collider.position}
                onChange={doNothing}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
