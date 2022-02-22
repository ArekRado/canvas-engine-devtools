import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const buttonStyle = recipe({
  base: {
    borderWidth: '1px',
    background: vars.color.gray700,
    borderColor: vars.color.gray900,
    outline: vars.color.blue100,
    color: vars.color.gray400,
    ':hover': {
      backgroundColor: vars.color.gray700,
      color: vars.color.gray50,
      cursor: 'pointer',
    },
    ':focus': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
    },
  },
  variants: {
    size: {
      xsmall: { padding: vars.space.xsmall },
      small: { padding: vars.space.small },
      medium: { padding: vars.space.medium },
      large: { padding: vars.space.large },
    },
  },
});

// Get the type
export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
