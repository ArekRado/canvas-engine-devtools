import { getTime } from '@arekrado/canvas-engine/system/time';
import React, { useContext } from 'react';
import { AppContext } from '../context/app';

export const Fps: React.FC = () => {
  const appState = useContext(AppContext);
  const time = getTime({ state: appState });
  const fps = time && time.delta > 0 ? Math.ceil(1000 / time.delta) : '-';

  return <div className="text-white">FPS: {fps}</div>;
};
