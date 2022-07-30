import React, { ReactElement, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalContext,
  Modal as ModalType,
  ModalName,
} from '../../context/modal';
import { modalStyle } from './ModalWrapper.css';

export const modalContainerId = 'canvas-engine-devtools-modal-container';

type ModalProps = {
  name: ModalName;
  children: (params: {
    name: ModalName;
    close: () => void;
    modal: ModalType<any>;
  }) => ReactElement;
};
export const ModalWrapper: React.FC<ModalProps> = ({ name, children }) => {
  const modalState = useContext(ModalContext);
  const modal = modalState.list.find((x) => x.name === name);

  const modalContainer = document.getElementById(modalContainerId);

  const close = () =>
    modalState.dispatch({ type: 'SetModal', payload: { isOpen: false, name } });

  return modal?.isOpen && modalContainer
    ? createPortal(
        <dialog className={modalStyle} open>
          {children({ close, modal, name })}
        </dialog>,
        modalContainer
      )
    : null;
};
