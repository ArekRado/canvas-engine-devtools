import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const buttonStyle = recipe({
  base: {
    borderWidth: '1px',
    borderColor: vars.color.gray900,
    background: vars.color.gray700,
    color: vars.color.gray400,
    ':hover': {
      backgroundColor: vars.color.gray700,
      color: vars.color.gray50,
      cursor: 'pointer',
    },
    fontSize: vars.fontSize['1x'],
  },
  variants: {
    size: {
      xsmall: { padding: vars.space['1x'] },
      small: { padding: vars.space['2x'] },
      medium: { padding: vars.space['4x'] },
      large: { padding: vars.space['8x'] },
    },
    type: {
      outlined: {
        background: 'transparent',
      },
      transparent: {
        background: 'transparent',
        border: 'none',
      },
    },
  },
});

// Get the type
export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
