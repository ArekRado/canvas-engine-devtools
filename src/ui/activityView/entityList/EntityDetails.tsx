import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { EditorContext } from '../../../context/editor';
import { ModalContext } from '../../../context/modal';
import { Button } from '../../common/Button';
import { sprinkles, text1 } from '../../util.css';
import { ComponentList } from './ComponentList';
import { CreateComponent } from './CreateComponent';
import { entityDetailsStyle } from './entityDetails.css';

export const EntityDetails: React.FC = () => {
  const { selectedEntity } = useContext(EditorContext);
  // const modalState = useContext(ModalContext);

  if (!selectedEntity) {
    return null;
  }

  return (
    <div className={entityDetailsStyle}>
      <div
        className={sprinkles({
          marginBottom: '8x',
          color: 'white',
        })}
      >
        Components
      </div>

      {/* <div
        className={sprinkles({
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2x',
        })}
      >
        <Button
          title="Remove entity"
          onClick={() => {
            modalState.dispatch({
              type: 'SetModal',
              payload: {
                name: 'confirm',
                isOpen: true,
                data: {
                  entity: '',
                },
              },
            });
          }}
        >
          <Trash size={12} />
        </Button>
      </div> */}

      <ComponentList />
      {/* <div className={sprinkles({ marginTop: '8x' })} />
      <CreateComponent /> */}
    </div>
  );
};
