import { Camera as CameraType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { InlineInput } from '../common/InlineInput';
import { InlineVector } from '../common/InlineVector';

export const CameraName = 'Camera'

export const Camera: React.FC = () => {
  const appState = useContext(AppContext);
  const component = appState.camera;

  const setCameraData = (data: Partial<CameraType>): void =>
    appState.dispatch({
      type: 'SetCamera',
      payload: {
        ...component,
        ...data,
      },
    });

  return (
    <div className="flex flex-1 flex-col m-2">
      <InlineVector
        label="position"
        name="position"
        id="position"
        value={component.position}
        onChange={(e) => setCameraData({ position: e })}
      />

      <InlineInput
        label="size"
        name="size"
        id="size"
        type="number"
        value={component.size}
        onChange={(e) => setCameraData({ size: parseFloat(e.target.value) })}
      />
    </div>
  );
};
