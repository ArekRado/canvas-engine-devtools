import { MouseInteraction as MouseInteractionType } from '@arekrado/canvas-engine';
import React from 'react';
import { doNothing } from '../../../../util/doNothing';
import { Checkbox } from '../../../common/Checkbox';
import { sprinkles } from '../../../util.css';

type MouseInteractionProps = {
  component: MouseInteractionType;
};
export const MouseInteraction: React.FC<MouseInteractionProps> = ({
  component,
}) => {
  return (
    <div className={sprinkles({ display: 'flex', flexDirection: 'column' })}>
      <Checkbox
        label="isClicked"
        name="isClicked"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isClicked"
        value={component.isClicked}
        onChange={doNothing}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isDoubleClicked"
        name="isDoubleClicked"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isDoubleClicked"
        value={component.isDoubleClicked}
        onChange={doNothing}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseOver"
        name="isMouseOver"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isMouseOver"
        value={component.isMouseOver}
        onChange={doNothing}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseEnter"
        name="isMouseEnter"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isMouseEnter"
        value={component.isMouseEnter}
        onChange={doNothing}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseLeave"
        name="isMouseLeave"
        containerClassName={sprinkles({ display: 'flex' })}
        labelClassName={sprinkles({ flex: '1' })}
        inputClassName={sprinkles({ flex: '1' })}
        id="isMouseLeave"
        value={component.isMouseLeave}
        onChange={doNothing}
        type="checkbox"
        disabled={true}
      />
    </div>
  );
};
