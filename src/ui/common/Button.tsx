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
  className,
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={`${buttonStyle(variants)} ${className}`}
  >
    {children}
  </button>
);
