import React, { useContext } from 'react';
import { AppContext } from '../context/app';

export const Fps: React.FC = () => {
  const appState = useContext(AppContext);
  const fps = 1000.0 / appState.time.delta;

  return <div className="text-white">FPS: {parseInt(fps.toString(), 10)}</div>;
};
