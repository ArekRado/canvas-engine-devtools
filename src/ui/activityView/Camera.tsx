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
        label="zoom"
        name="zoom"
        id="zoom"
        type="number"
        value={component.zoom}
        onChange={(e) => setCameraData({ zoom: parseFloat(e.target.value) })}
      />

      <InlineVector
        label="pivot"
        name="pivot"
        id="pivot"
        value={component.pivot}
        onChange={(e) => setCameraData({ pivot: e })}
      />
    </div>
  );
};
