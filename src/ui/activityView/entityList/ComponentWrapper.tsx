import {
  AnyState,
  emitEvent,
  Entity,
  removeComponent,
} from '@arekrado/canvas-engine';
import React, { ReactNode, useContext, useState } from 'react';
import { ChevronDown, ChevronRight, Trash } from 'react-feather';
import { EditorContext } from '../../../context/editor';
import { ModalContext } from '../../../context/modal';
import { DebugEvent } from '../../../system/debug/debug';
import { Button } from '../../common/Button';
import { useAppState } from '../../hooks/useAppState';
import { sprinkles } from '../../util.css';

const removeSelectedComponent = ({
  state,
  entity,
  name,
}: {
  state: AnyState;
  entity: Entity;
  name: string;
}) => {
  state = removeComponent({
    state,
    entity,
    name,
  });

  emitEvent({
    type: DebugEvent.Type.setStateFromEditor,
    payload: state,
  });
};

type ComponentWrapperProps = {
  componentName: string;
  children: ReactNode;
};
export const ComponentWrapper = ({
  componentName,
  children,
}: ComponentWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const modalState = useContext(ModalContext);
  const { selectedEntity } = useContext(EditorContext);
  const appState = useAppState();

  if (!appState || !selectedEntity) {
    return null;
  }

  return (
    <div className={sprinkles({ paddingY: '8x' })}>
      <div
        className={sprinkles({
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1x',
        })}
      >
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variants={{ type: 'transparent' }}
        >
          {isCollapsed ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </Button>
        <div
          className={sprinkles({
            flex: '1',
            color: 'white',
          })}
        >
          {componentName}
        </div>
        <Button
          title="Remove entity"
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'confirm',
                isOpen: true,
                data: {
                  title: `Are you sure you want to remove ${componentName}?`,
                  onAccept: () => {
                    removeSelectedComponent({
                      state: appState,
                      entity: selectedEntity,
                      name: componentName,
                    });
                    modalState.dispatch({
                      type: 'SetModal',
                      payload: { isOpen: false, name: 'confirm' },
                    });
                  },
                },
              },
            });
          }}
        >
          <Trash size={12} />
        </Button>
      </div>

      {!isCollapsed && children}
    </div>
  );
};
