import React, { ReactElement } from 'react';
import { inputContainerStyle, inputStyle, InputVariants } from './input.css';
import { text1 } from '../util.css';

export type InputHTMLAttributes = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps<Value = string | number> = {
  label?: ReactElement | string;
  // max?: string;
  // min?: string;
  // containerClassName?: string;
  // labelClassName?: string;
  // inputClassName?: string;
  value?: Value;
  id: InputHTMLAttributes['id'];
  type?: InputHTMLAttributes['type'];
  onChange: InputHTMLAttributes['onChange'];
  disabled?: InputHTMLAttributes['disabled'];
  max?: InputHTMLAttributes['max'];
  min?: InputHTMLAttributes['min'];
  placeholder?: InputHTMLAttributes['placeholder'];
  title?: InputHTMLAttributes['title'];
  name: InputHTMLAttributes['name'];
  checked?: InputHTMLAttributes['checked'];
  required?: InputHTMLAttributes['required'];
  variants: InputVariants;
};

export const Input: React.FC<InputProps> = ({
  label,
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
  required,
  variants,
}) => (
  <div className={inputContainerStyle(variants)}>
    {label && (
      <label htmlFor={id} className={text1}>
        {label}
      </label>
    )}
    <input
      className={inputStyle(variants)}
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
      required={required}
    />
  </div>
);
