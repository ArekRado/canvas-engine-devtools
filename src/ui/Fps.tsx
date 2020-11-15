import React, { useContext } from 'react';
import { AppContext } from '../context/app';

export const Fps: React.FC = () => {
  const appState = useContext(AppContext);
  const fps =
    appState.time.delta > 0 ? Math.ceil(1000 / appState.time.delta) : '-';

  return <div className="text-white">FPS: {fps}</div>;
};
