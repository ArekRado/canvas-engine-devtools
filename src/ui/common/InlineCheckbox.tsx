import React from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';

export const InlineCheckbox: React.FC<CheckboxProps> = (props) => (
  <Checkbox
    containerClassName="col-span-12 grid grid-cols-12 my-1"
    labelClassName="col-span-4"
    inputClassName="col-span-8"
    {...props}
  />
);
