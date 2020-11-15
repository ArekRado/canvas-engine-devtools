import React, { ReactElement } from 'react';

export type InputProps = {
  label?: ReactElement | string;
  // max?: string;
  // min?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const Input: React.FC<InputProps> = ({
  label,
  containerClassName,
  labelClassName,
  inputClassName,
  id,
  type = 'text',
  value,
  onChange,
  disabled = false,
  max = undefined,
  min = undefined,
  placeholder,
  title,
}) => (
  <div className={containerClassName}>
    {label && (
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    )}
    <input
      className={`h-full w-full focus:outline-lightblue text-white bg-gray-700 px-1 ${inputClassName}`}
      type={type}
      value={value}
      onChange={onChange}
      id={id}
      disabled={disabled}
      max={max}
      min={min}
      placeholder={placeholder}
      title={title}
    />
  </div>
);
