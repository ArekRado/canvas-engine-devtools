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

type ButtonProps = {
  size?: ButtonSize;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button: React.FC<ButtonProps> = ({ children, size, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={`
        ${getButtonSize(size)}
         border border-gray-600 bg-gray-800 hover:bg-gray-700 focus:outline-lightblue 
        ${props.className || ''}
      `}
    >
      {children}
    </button>
  );
};
