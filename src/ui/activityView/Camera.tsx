import { Camera as CameraType } from '@arekrado/canvas-engine';
import { getCamera } from '@arekrado/canvas-engine/system/camera';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { InlineInput } from '../common/InlineInput';
import { InlineVector } from '../common/InlineVector';

export const CameraName = 'Camera';

export const Camera: React.FC = () => {
  const appState = useContext(AppContext);
  const component = getCamera({ state: appState });

  if (!component) {
    return null;
  }

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
