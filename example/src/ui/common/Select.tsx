import React, { ReactElement } from 'react';

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
  options = [],
}) => (
  <div className={containerClassName}>
    {label && (
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    )}
    <select
      className={`text-black w-full focus:outline-lightblue ${inputClassName}`}
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
