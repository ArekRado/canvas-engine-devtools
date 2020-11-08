import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../context/modal';

type ModalProps = { id: string };
export const Modal: React.FC<ModalProps> = ({ id, children }) => {
  const modalState = useContext(ModalContext);
  const modal = modalState.list[id];

  const modalContainer = document.getElementById('modal-container');

  return modal?.isOpen && modalContainer
    ? createPortal(
        <>
          <div
            className="absolute inset-0 bg-blue-500 bg-opacity-25 z-modal-backdrop"
            onClick={() => modalState.dispatch({ type: 'Close', payload: id })}
          />
          <div className="absolute m-auto modal-wrapper top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-_Modal bg-gray-800 p-4">
            {children}
          </div>
        </>,
        modalContainer
      )
    : null;
};
