import React, { useContext } from 'react';
// import { saveStateInLocalStorage } from '../../debug';
import { Button } from '../common/Button';
import { ModalWrapper } from './ModalWrapper';

export const SaveModal: React.FC = () => {

  return (
    <ModalWrapper name="save">
      {({ close }) => (
        <div>
          <Button
            onClick={() => {
              // saveStateInLocalStorage(appState);
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
