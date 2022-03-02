import React, { ReactElement } from 'react';
import { text1 } from '../util.css';
import { selectContainerStyle, selectStyle, SelectVariants } from './select.css';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label?: ReactElement | string;
  options?: SelectOption[];
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  variants?: SelectVariants;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
export const Select: React.FC<SelectProps> = ({
  label,
  containerClassName,
  labelClassName,
  inputClassName,
  id,
  value,
  onChange,
  variants,
  options = [],
}) => (
  <div className={`${selectContainerStyle(variants)} ${containerClassName}`}>
    {label && (
      <label htmlFor={id} className={`${labelClassName} ${text1}`}>
        {label}
      </label>
    )}
    <select
      className={`${selectStyle} ${inputClassName}`}
      onChange={onChange}
      value={value}
      id={id}
    >
      <option />
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
