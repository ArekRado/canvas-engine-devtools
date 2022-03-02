import {
  CollideBox as CollideBoxType,
  getEntity,
} from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { doNothing } from '../../../../util/doNothing';
import { EntityButton } from '../../../common/EntityButton';
import { Vector } from '../../../common/Vector';
import { useAppState } from '../../../hooks/useAppState';
import { sprinkles } from '../../../util.css';

type CollideBoxProps = {
  component: CollideBoxType;
};
export const CollideBox: React.FC<CollideBoxProps> = ({ component }) => {
  const appState = useAppState();

  // const setCollideBoxData = (data: Partial<CollideBoxType>): void =>
  //   appState.dispatch({
  //     type: 'SetCollideBoxComponent',
  //     payload: {
  //       ...component,
  //       ...data,
  //     },
  //   });

  return (
    <div className={sprinkles({ display: 'flex', flexDirection: 'column' })}>
      <Vector
        label="size"
        name="size"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="size"
        value={component.size}
        onChange={doNothing}
      />

      <Vector
        label="position"
        name="position"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="position"
        value={component.position}
        onChange={doNothing}
      />

      {component.collisions.length > 0 ? (
        <>
          <div> Collisions </div>
          <ul>
            {component.collisions.map((collisionType) => (
              <li key={collisionType.entity}>
                <EntityButton entity={collisionType.entity} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
