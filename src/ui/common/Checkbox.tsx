import React from 'react';
import { Input, InputProps } from './Input';

type CheckboxProps = InputProps & {
  value?: boolean;
};
export const Checkbox: React.FC<CheckboxProps> = (props) => (
  <Input {...props} checked={props.value} />
);
