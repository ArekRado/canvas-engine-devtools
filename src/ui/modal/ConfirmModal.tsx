import React from 'react';
import { Button } from '../common/Button';
import { ModalWrapper } from './ModalWrapper';

export const ConfirmModal: React.FC = () => (
  <ModalWrapper name="confirm">
    {({ close, modal }) => (
      <div className="flex flex-col">
        <div className="text-center">{modal.data.title}</div>
        <div className="flex justify-around mt-6">
          <Button onClick={close}>Cancel</Button>
          <Button onClick={modal.data.onAccept}>Accept</Button>
        </div>
      </div>
    )}
  </ModalWrapper>
);
