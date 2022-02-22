import { Component } from '@arekrado/canvas-engine';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../context/app';
import { EditorContext } from '../../../../context/editor';
import { ModalContext } from '../../../../context/modal';
import { Button } from '../../../common/Button';
import { ConfirmModal } from '../../../modal/ConfirmModal';

type ComponentWrapperProps = {
  component: Component<any>;
  componentName: string;
};
export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  componentName,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const modalState = useContext(ModalContext);

  return (
    <div className="my-3">
      <div className="flex justify-between mt-1">
        <Button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '<ChevronDown size={12} />' : '<ChevronRight size={12} />'}
        </Button>
        <div className="text-white flex-1">{componentName}</div>
        <Button
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'confirm',
                isOpen: true,
                data: {
                  title: `Are you sure you want to remove ${componentName}?`,
                  onAccept: () => {},
                },
              },
            });
          }}
        >
          X size={12} 
        </Button>
      </div>

      {!isCollapsed && children}
    </div>
  );
};
