import React from 'react';
import { Button } from '../common/Button';
import { sprinkles } from '../util.css';
import { confirmModalTitle } from './ConfirmModal.css';
import { ModalWrapper } from './ModalWrapper';

export const ConfirmModal: React.FC = () => (
  <ModalWrapper name="confirm">
    {({ close, modal }) => (
      <div className="flex flex-col">
        <div className={confirmModalTitle}>{modal.data.title}</div>
        <div
          className={sprinkles({
            display: 'flex',
            justifyContent: 'space-around',
          })}
        >
          <Button onClick={close}>Cancel</Button>
          <Button onClick={modal.data.onAccept}>Accept</Button>
        </div>
      </div>
    )}
  </ModalWrapper>
);
