import { Transform as TransformType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { EditorContext } from '../../context/editor';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';

type TransformProps = {
  component: TransformType;
};
export const Transform: React.FC<TransformProps> = ({ component }) => {
  const appState = useContext(AppContext);
  const editorState = useContext(EditorContext);

  const setTransformData = (data: Partial<TransformType['data']>): void =>
    appState.dispatch({
      type: 'SetTransformComponent',
      payload: {
        ...component,
        ...data,
      },
    });

  return (
    <div className="flex flex-col mt-3">
      <Vector
        label={component.parent ? 'localPosition' : 'position'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="position"
        name="position"
        value={
          component.parent
            ? component.localPosition
            : component.position
        }
        onChange={(value) =>
          component.parent
            ? setTransformData({ localPosition: value })
            : setTransformData({ position: value })
        }
      />

      <Input
        label={component.parent ? 'localRotation' : 'rotation'}
        name={component.parent ? 'localRotation' : 'rotation'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="rotation"
        type="number"
        value={
          component.parent
            ? component.localRotation
            : component.rotation
        }
        onChange={(e) =>
          component.parent
            ? setTransformData({ localRotation: parseFloat(e.target.value) })
            : setTransformData({ rotation: parseFloat(e.target.value) })
        }
      />

      <Vector
        label={component.parent ? 'localScale' : 'scale'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="scale"
        name="scale"
        value={
          component.parent
            ? component.localScale
            : component.scale
        }
        onChange={(value) =>
          component.parent
            ? setTransformData({ localScale: value })
            : setTransformData({ scale: value })
        }
      />

      <div className="grid grid-cols-12 my-1">
        <div className="col-span-4"> parent</div>
        <div className="col-span-8">
          {component.parent ? component.parent.name : 'Root'}
        </div>
      </div>
    </div>
  );
};
