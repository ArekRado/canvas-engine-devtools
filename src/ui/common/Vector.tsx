import React, { ReactElement } from 'react';
import { Input } from './Input';
import { Vector2D, vector } from '@arekrado/vector-2d';

type VectorProps = {
  name: string;
  value: Vector2D;
  label?: ReactElement | string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  id: string;
  onChange: (value: Vector2D) => void;
};
export const Vector: React.FC<VectorProps> = ({
  containerClassName,
  labelClassName,
  inputClassName,
  label,
  value: [x, y],
  id,
  onChange,
}) => (
  <div className={containerClassName}>
    {label && (
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    )}
    <Input
      containerClassName={inputClassName}
      type="number"
      id={id}
      name={`${name}[0]`}
      value={x}
      onChange={(event) => onChange(vector(parseFloat(event.target.value), y))}
    />
    <Input
      containerClassName={inputClassName}
      type="number"
      id={id}
      name={`${name}[1]`}
      value={y}
      onChange={(event) => onChange(vector(x, parseFloat(event.target.value)))}
    />
  </div>
);
