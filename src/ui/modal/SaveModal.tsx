import React, { useContext } from 'react';
import { saveStateInLocalStorage } from '../../debug';
import { Button } from '../common/Button';
import { AppContext } from '../../context/app';
import { ModalWrapper } from './ModalWrapper';

export const SaveModal: React.FC = () => {
  const appState = useContext(AppContext);

  return (
    <ModalWrapper name="save">
      {({ close }) => (
        <div>
          <Button
            onClick={(_) => {
              saveStateInLocalStorage(appState);
              close();
            }}
          >
            Click to save
          </Button>
        </div>
      )}
    </ModalWrapper>
  );
};
