import React, { ReactElement } from 'react';

type InputHTMLAttributes = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps<Value = string> = {
  label?: ReactElement | string;
  // max?: string;
  // min?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: Value;
  id: InputHTMLAttributes['id'];
  type: InputHTMLAttributes['type'];
  onChange: InputHTMLAttributes['onChange'];
  disabled?: InputHTMLAttributes['disabled'];
  max?: InputHTMLAttributes['max'];
  min?: InputHTMLAttributes['min'];
  placeholder?: InputHTMLAttributes['placeholder'];
  title?: InputHTMLAttributes['title'];
  name: InputHTMLAttributes['name'];
  checked?: InputHTMLAttributes['checked'];
};

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
  name,
  checked,
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
      name={name}
      checked={checked ?? false}
    />
  </div>
);
