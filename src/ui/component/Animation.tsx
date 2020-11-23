import { Animation as AnimationType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { ModalContext } from '../../context/modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

type AnimationProps = {
  component: AnimationType;
};
export const Animation: React.FC<AnimationProps> = ({ component }) => {
  const appState = useContext(AppContext);
  const modalState = useContext(ModalContext);

  const setAnimationData = (data: Partial<AnimationType>): void =>
    appState.dispatch({
      type: 'SetAnimationComponent',
      payload: {
        ...component,
        ...data,
      },
    });

  return (
    <div className="flex flex-col">
      <Input
        label="isPlaying"
        name="isPlaying"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isPlaying"
        type="checkbox"
        checked={component.isPlaying}
        onChange={(e) => setAnimationData({ isPlaying: !!e.target.value })}
      />
      <Input
        label="currentTime"
        name="currentTime"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="currentTime"
        type="number"
        value={component.currentTime}
        onChange={(e) =>
          setAnimationData({ currentTime: parseFloat(e.target.value) })
        }
      />

      <div className="grid grid-cols-12 my-1">
        <div className="col-span-4"> component </div>
        <div className="col-span-8">{component.property.component}</div>
      </div>

      <div className="grid grid-cols-12 my-1">
        <div className="col-span-4"> wrapMode </div>
        <div className="col-span-8">{component.wrapMode}</div>
      </div>

      <Button
        onClick={() =>
          modalState.dispatch({
            type: 'SetModal',
            payload: {
              name: 'animation',
              isOpen: true,
              data: component.entity,
            },
          })
        }
      >
        Edit Animation
      </Button>
    </div>
  );
};
