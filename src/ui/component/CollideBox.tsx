
import { CollideBox as CollideBoxType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { Vector } from '../common/Vector';

type CollideBoxProps = {
  component: CollideBoxType;
};
export const CollideBox: React.FC<CollideBoxProps> = ({ component }) => {
  const appState = useContext(AppContext);

  const setCollideBoxData = (data: Partial<CollideBoxType>): void =>
    appState.dispatch({
      type: 'SetCollideBoxComponent',
      payload: {
        ...component,
        ...data,
      },
    });

  return (
    <div className="flex flex-col mt-3">
     <Vector
        label="size"
        name="size"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="size"
        value={component.size}
        onChange={(e) => setCollideBoxData({ size: e })}
      />

      <Vector
        label="position"
        name="position"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="position"
        value={component.position}
        onChange={(e) => setCollideBoxData({ position: e })}
      />

      {component.collisions.length > 0 && <div> Collisions </div>}
      {component.collisions.map((collisionType) => {
        if (collisionType.type === 'box') {
          return `Box - ${collisionType.entityId}`;
        }

        if (collisionType.type === 'circle') {
          return `Circle - ${collisionType.entityId}`;
        }

        return '-';
      })}
    </div>
  );
};
