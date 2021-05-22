import { MouseInteraction as MouseInteractionType } from '@arekrado/canvas-engine';
import React from 'react';
import { Checkbox } from '../../../common/Checkbox';

type MouseInteractionProps = {
  component: MouseInteractionType;
};
export const MouseInteraction: React.FC<MouseInteractionProps> = ({
  component,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <Checkbox
        label="isClicked"
        name="isClicked"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isClicked"
        value={component.isClicked}
        onChange={() => {}}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isDoubleClicked"
        name="isDoubleClicked"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isDoubleClicked"
        value={component.isDoubleClicked}
        onChange={() => {}}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseOver"
        name="isMouseOver"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isMouseOver"
        value={component.isMouseOver}
        onChange={() => {}}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseEnter"
        name="isMouseEnter"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isMouseEnter"
        value={component.isMouseEnter}
        onChange={() => {}}
        type="checkbox"
        disabled={true}
      />

      <Checkbox
        label="isMouseLeave"
        name="isMouseLeave"
        containerClassName="grid grid-cols-12 my-1"
        labelClassName="col-span-4"
        inputClassName="col-span-8"
        id="isMouseLeave"
        value={component.isMouseLeave}
        onChange={() => {}}
        type="checkbox"
        disabled={true}
      />
    </div>
  );
};
