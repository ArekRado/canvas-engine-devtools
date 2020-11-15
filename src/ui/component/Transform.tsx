import { Transform as TransformType } from '@arekrado/canvas-engine/dist/component';
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
        data: {
          ...component.data,
          ...data,
        },
      },
    });

  return (
    <div className="flex flex-col mt-3">
      <Vector
        label={component.data.parent ? 'localPosition' : 'position'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="position"
        name="position"
        value={
          component.data.parent
            ? component.data.localPosition
            : component.data.position
        }
        onChange={(value) =>
          component.data.parent
            ? setTransformData({ localPosition: value })
            : setTransformData({ position: value })
        }
      />

      <Input
        label={component.data.parent ? 'localRotation' : 'rotation'}
        name={component.data.parent ? 'localRotation' : 'rotation'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="rotation"
        type="number"
        value={
          component.data.parent
            ? component.data.localRotation
            : component.data.rotation
        }
        onChange={(e) =>
          component.data.parent
            ? setTransformData({ localRotation: parseFloat(e.target.value) })
            : setTransformData({ rotation: parseFloat(e.target.value) })
        }
      />

      <Vector
        label={component.data.parent ? 'localScale' : 'scale'}
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-4"
        id="scale"
        name="scale"
        value={
          component.data.parent
            ? component.data.localScale
            : component.data.scale
        }
        onChange={(value) =>
          component.data.parent
            ? setTransformData({ localScale: value })
            : setTransformData({ scale: value })
        }
      />

      <div className="grid grid-cols-12 my-1">
        <div className="col-span-4"> parent</div>
        <div className="col-span-8">
          {component.data.parent ? component.data.parent.name : 'Root'}
        </div>
      </div>
    </div>
  );
};
