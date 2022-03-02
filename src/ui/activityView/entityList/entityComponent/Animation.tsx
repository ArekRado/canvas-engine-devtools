import { Animation as AnimationType } from '@arekrado/canvas-engine';
import React from 'react';

type AnimationProps = {
  component: AnimationType.AnimationComponent;
};
export const Animation: React.FC<AnimationProps> = ({ component }) => {
  return (
    <div className="flex flex-col">
      <pre>{JSON.stringify(component, null, 2)}</pre>
      {/* <Input
        label="isPlaying"
        name="isPlaying"
        containerClassName={sprinkles({ display: 'flex', marginY: '2x' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isPlaying"
        type="checkbox"
        checked={component.isPlaying}
        onChange={doNothing}
      />
      <Input
        label="currentTime"
        name="currentTime"
        containerClassName={sprinkles({ display: 'flex', marginY: '2x' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '2' })}
        id="currentTime"
        type="number"
        value={component.currentTime}
        onChange={doNothing}
      />

      <div className={sprinkles({ display: 'flex', marginY: '2x' })}>
        <div className={sprinkles({ flex: '1' })}> wrapMode </div>
        <div className={sprinkles({ flex: '1' })}>{component.wrapMode}</div>
      </div> */}

      {/* <Button
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
      </Button> */}
    </div>
  );
};
