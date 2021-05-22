import React from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const getButtonSize = (size?: ButtonSize) => {
  switch (size) {
    case 'xs':
      return 'p-1';
    case 'sm':
      return 'p-2';
    case 'md':
      return 'p-3';
    case 'lg':
      return 'p-4';

    default:
      return 'p-1';
  }
};

export type ButtonProps = {
  focused?: boolean;
  size?: ButtonSize;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button: React.FC<ButtonProps> = ({
  children,
  size,
  focused,
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={`
        ${getButtonSize(size)}
          hover:bg-gray-700 focus:outline-lightblue hover:text-white 
        ${props.disabled ? 'cursor-not-allowed' : ''}
        ${focused ? 'text-white' : 'text-gray-500'}
        ${props.className || ''}
      `}
  >
    {children}
  </button>
);
