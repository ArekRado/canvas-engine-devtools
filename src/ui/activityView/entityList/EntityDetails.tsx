import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { EditorContext } from '../../../context/editor';
import { ModalContext } from '../../../context/modal';
import { Button } from '../../common/Button';
import { useAppState } from '../../hooks/useAppState';
import { sprinkles } from '../../util.css';
import { ComponentList } from './ComponentList';
import { entityDetailsStyle } from './entityDetails.css';

export const EntityDetails: React.FC = () => {
  const { selectedEntity } = useContext(EditorContext);
  const modalState = useContext(ModalContext);
  const appState = useAppState();

  if (!selectedEntity) {
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
          })}
        >
          <div
            className={sprinkles({
              marginBottom: '8x',
              marginRight: '8x',
              color: 'white',
            })}
          >
            Entity
          </div>

          <div>{selectedEntity}</div>
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
                    title: `Are you sure you want to remove entity ${selectedEntity} and all their components?`,
                    onAccept: () => {

                      // appState.
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
