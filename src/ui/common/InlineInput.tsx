import React from 'react';
import { Input, InputProps } from './Input';

export const InlineInput: React.FC<InputProps> = (props) => (
  <Input
    containerClassName="col-span-12 grid grid-cols-12 my-1"
    labelClassName="col-span-4"
    inputClassName="col-span-8"
    {...props}
  />
);
