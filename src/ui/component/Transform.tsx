import { uuid } from '@arekrado/canvas-engine';
import { Transform as TransformType } from '@arekrado/canvas-engine/dist/component';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { EditorContext } from '../../context/editor';
import { ModalContext } from '../../context/modal';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';
// import React, { useContext } from 'react';
// import { AppContext } from '../../context/app';

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
    <div className="grid grid-cols-12 gap-1 mt-3">
      <div className="col-span-4"> position </div>
      <div className="col-span-8">
        <Vector
          value={component.data.position}
          onChange={(value) => setTransformData({ position: value })}
        />
      </div>
      <div className="col-span-4"> localPosition </div>
      <div className="col-span-8">
        <Vector
          value={component.data.localPosition}
          onChange={(value) => setTransformData({ localPosition: value })}
        />
      </div>
      <div className="col-span-4"> rotation </div>
      <div className="col-span-8">
        <Input
          type="number"
          value={component.data.rotation}
          onChange={(e) =>
            setTransformData({ rotation: parseFloat(e.target.value) })
          }
        />
      </div>
      <div className="col-span-4"> localRotation </div>
      <div className="col-span-8">
        <Input
          type="number"
          value={component.data.localRotation}
          onChange={(e) =>
            setTransformData({ localRotation: parseFloat(e.target.value) })
          }
        />
      </div>
      <div className="col-span-4"> scale </div>
      <div className="col-span-8">
        <Vector
          value={component.data.scale}
          onChange={(value) => setTransformData({ scale: value })}
          // onChange={value => appState.dispatch(SetTransformScale(entity, value))}
        />
      </div>
      <div className="col-span-4"> localScale </div>
      <div className="col-span-8">
        <Vector
          value={component.data.localScale}
          onChange={(value) => setTransformData({ localScale: value })}
        />
      </div>
      <div className="col-span-4"> parent</div>
      <div className="col-span-8">
        {component.data.parent
          ? uuid.humanFriendlyEntity(component.data.parent)
          : 'None'}
      </div>
    </div>
  );
};
