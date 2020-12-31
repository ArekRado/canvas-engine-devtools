import React from 'react';
import { Button } from '../common/Button';
import { ModalWrapper } from './ModalWrapper';

export const SaveModal: React.FC = () => {

  return (
    <ModalWrapper name="save">
      {({ close }) => (
        <div>
          <Button
            onClick={(_) => {
              close();
            }}
          >
            Click to close xD
          </Button>
        </div>
      )}
    </ModalWrapper>
  );
};
