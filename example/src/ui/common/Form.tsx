import React from 'react';

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form: React.FC<FormProps> = ({ children, onSubmit, ...props }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit && onSubmit(e);
    }}
    {...props}
  >
    {children}
  </form>
);
