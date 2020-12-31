import React, { useContext } from 'react';
import { AppContext } from './context/app';

export const AreaBottomMenu: React.FC = () => {
  const appState = useContext(AppContext);

  return (
    <div>
      {appState.selectedArea ? 'AreaBottomMenu' : '-'}
    </div>
  );
};
