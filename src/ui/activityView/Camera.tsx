import { Camera as CameraType } from '@arekrado/canvas-engine';
import { getCamera } from '@arekrado/canvas-engine/system/camera';
import React from 'react';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';
import { useAppState } from '../hooks/useAppState';

export const CameraName = 'Camera';

export const Camera: React.FC = () => {
  const appState = useAppState();
  const component = appState ? getCamera({ state: appState }) : undefined;

  if (!component) {
    return null;
  }

  const setCameraData = (data: Partial<CameraType>): void => {};
  // appState.dispatch({
  //   type: 'SetCamera',
  //   payload: {
  //     ...component,
  //     ...data,
  //   },
  // });

  return (
    <div className="flex flex-1 flex-col m-2">
      <Vector
        label="position"
        name="position"
        id="position"
        value={component.position}
        onChange={(e) => setCameraData({ position: e })}
      />

      <Input
        label="distance"
        name="distance"
        id="distance"
        type="number"
        value={component.distance}
        onChange={(e) =>
          setCameraData({ distance: parseFloat(e.target.value) })
        }
      />
    </div>
  );
};
