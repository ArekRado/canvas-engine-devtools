import React from 'react';
import { Vector, VectorProps } from './Vector';

export const InlineVector: React.FC<VectorProps> = (props) => (
  <Vector
    containerClassName="grid grid-cols-12 my-1"
    labelClassName="col-span-4"
    inputClassName="col-span-4"
    {...props}
  />
);
