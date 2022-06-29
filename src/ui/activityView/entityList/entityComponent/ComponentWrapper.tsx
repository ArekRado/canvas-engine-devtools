import React, { useContext, useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'react-feather';
import { ModalContext } from '../../../../context/modal';
import { Button } from '../../../common/Button';
import { sprinkles } from '../../../util.css';

type ComponentWrapperProps = {
  componentName: string;
};
export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  componentName,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const modalState = useContext(ModalContext);

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
        {/* <Button
          variants={{ type: 'transparent' }}
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
          <X size={12} />
        </Button> */}
      </div>

      {!isCollapsed && children}
    </div>
  );
};
