import React, { ReactElement, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalContext,
  Modal as ModalType,
  ModalName,
} from '../../context/modal';

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
        <>
          <div
            className="absolute inset-0 bg-blue-500 bg-opacity-25 z-modal-backdrop"
            onClick={close}
          />
          <div className="absolute m-auto modal-wrapper top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-_Modal bg-gray-800 p-4">
            {children({ close, modal, name })}
          </div>
        </>,
        modalContainer
      )
    : null;
};
