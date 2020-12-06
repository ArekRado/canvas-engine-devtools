import React, { useContext } from 'react';
import { AppContext } from '../context/app';

export const SystemList: React.FC = () => {
  const appState = useContext(AppContext);

  return (
    <>
      <div className="text-white mb-3">Systems:</div>
      <div className='mb-3'>
        {Object.keys(appState.system).map((system) => (
          <div key={system}>{system}</div>
        ))}
      </div>
    </>
  );
};
