import {
  AnyState,
  emitEvent,
  Entity,
  removeEntity,
} from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { EditorContext } from '../../../context/editor';
import { ModalContext } from '../../../context/modal';
import { DebugEvent } from '../../../system/debug/debug';
import { Button } from '../../common/Button';
import { useAppState } from '../../hooks/useAppState';
import { sprinkles } from '../../util.css';
import { ComponentList } from './ComponentList';
import { entityDetailsStyle } from './entityDetails.css';

const removeSelectedEntity = ({
  state,
  entity,
}: {
  state: AnyState;
  entity: Entity;
}) => {
  state = removeEntity({
    state,
    entity,
  });

  emitEvent({
    type: DebugEvent.Type.setStateFromEditor,
    payload: state,
  });
};

export const EntityDetails: React.FC = () => {
  const { selectedEntity } = useContext(EditorContext);
  const modalState = useContext(ModalContext);
  const appState = useAppState();

  if (!selectedEntity || !appState) {
    return null;
  }

  return (
    <div className={entityDetailsStyle}>
      <div
        className={sprinkles({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={sprinkles({
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8x',
            color: 'white',
          })}
        >
          <div>Entity {selectedEntity}</div>
        </div>

        <div>
          <Button
            title="Remove entity"
            onClick={() => {
              modalState.dispatch({
                type: 'SetModal',
                payload: {
                  name: 'confirm',
                  isOpen: true,
                  data: {
                    title: `Are you sure you want to remove entity "${selectedEntity}" and all their components?`,
                    onAccept: () => {
                      removeSelectedEntity({
                        state: appState,
                        entity: selectedEntity,
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
      </div>
      <div
        className={sprinkles({
          marginBottom: '8x',
          color: 'white',
        })}
      >
        Components
      </div>

      <ComponentList />
    </div>
  );
};
