import React from 'react';
import { Input, InputProps } from './Input';

export type CheckboxProps = InputProps<boolean>

export const Checkbox: React.FC<CheckboxProps> = (props) => (
  <Input {...props} checked={props.value} value='' />
);
