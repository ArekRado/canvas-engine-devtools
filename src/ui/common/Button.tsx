import React from 'react';
import { buttonStyle, ButtonVariants } from './button.css';

export type ButtonProps = {
  focused?: boolean;
  variants?: ButtonVariants;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button: React.FC<ButtonProps> = ({
  children,
  variants,
  focused,
  ...props
}) => (
  <button type="button" {...props} className={buttonStyle(variants)}>
    {children}
  </button>
);
