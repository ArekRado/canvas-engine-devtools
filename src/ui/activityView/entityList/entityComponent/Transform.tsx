import { Transform as TransformComponent } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { ModalContext } from '../../../../context/modal';
import { doNothing } from '../../../../util/doNothing';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { Vector } from '../../../common/Vector';
import { sprinkles, text1 } from '../../../util.css';

type TransformProps = {
  component: TransformComponent;
};
export const Transform: React.FC<TransformProps> = ({ component }) => {
  // const modalState = useContext(ModalContext);

  const position = component.parentId
    ? component.fromParentPosition
    : component.position;

  const rotation = component.parentId
    ? component.fromParentRotation
    : component.rotation;

  const scale = component.parentId
    ? component.fromParentScale
    : component.scale;

  return (
    <div
      className={sprinkles({
        padding: '2x',
      })}
    >
      <Vector
        label={component.parentId ? 'fromParentPosition' : 'position'}
        containerClassName={sprinkles({ display: 'flex', marginY: '2x' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="position"
        name="position"
        value={[position[0], position[1]]}
        onChange={doNothing}
        //   component.parentId
        //     ? setEntityData({ fromParentPosition: value })
        //     : setEntityData({ position: value })
        // }
      />

      <Vector
        label={component.parentId ? 'fromParentRotation' : 'rotation'}
        name={component.parentId ? 'fromParentRotation' : 'rotation'}
        containerClassName={sprinkles({ display: 'flex', marginY: '2x' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="rotation"
        value={[rotation[0], rotation[1]]}
        onChange={doNothing}
        // onChange={(e) =>
        //   component.parentId
        //     ? setEntityData({
        //         fromParentRotation: parseFloat(e.target.value),
        //       })
        //     : setEntityData({ rotation: parseFloat(e.target.value) })
        // }
      />

      <Vector
        label={component.parentId ? 'fromParentScale' : 'scale'}
        containerClassName={sprinkles({ display: 'flex', marginY: '2x' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="scale"
        name="scale"
        value={[scale[0], scale[1]]}
        onChange={doNothing}
        //   component.parentId
        //     ? setEntityData({ fromParentScale: value })
        //     : setEntityData({ scale: value })
        // }
      />

      <Input
        label="parent"
        name="parent"
        id="parent"
        type="string"
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '2' })}
        value={component.parentId ? component.parentId : 'Root'}
        onChange={doNothing}
        disabled={true}
      />
    </div>
  );
};
