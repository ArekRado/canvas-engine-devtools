import React, { ReactElement } from 'react';
import { Input, InputHTMLAttributes } from './Input';
import { Vector2D, vector } from '@arekrado/vector-2d';
import { vectorContainerStyle, VectorVariants } from './vector.css';
import { text1 } from '../util.css';

export type VectorProps = {
  name: string;
  value: Vector2D;
  label?: ReactElement | string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  id: string;
  onChange?: (value: Vector2D) => void;
  disabled?: InputHTMLAttributes['disabled'];
  variants?: VectorVariants;
};
export const Vector: React.FC<VectorProps> = ({
  containerClassName,
  labelClassName,
  inputClassName,
  name,
  label,
  value: [x, y],
  id,
  disabled = false,
  onChange,
  variants,
}) => (
  <div className={`${vectorContainerStyle(variants)} ${containerClassName}`}>
    {label && (
      <label htmlFor={id} className={`${text1} ${labelClassName}`}>
        {label}
      </label>
    )}
    <Input
      disabled={disabled}
      containerClassName={inputClassName}
      type="number"
      id={id}
      name={`${name}[0]`}
      value={x}
      onChange={(event) =>
        onChange ? vector(parseFloat(event.target.value), y) : event
      }
    />
    <Input
      disabled={disabled}
      containerClassName={inputClassName}
      type="number"
      id={id}
      name={`${name}[1]`}
      value={y}
      onChange={(event) =>
        onChange ? vector(x, parseFloat(event.target.value)) : event
      }
    />
  </div>
);
