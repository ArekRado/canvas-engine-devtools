import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const inputContainerStyle = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    inline: {
      true: { flexDirection: 'row' },
      false: { flexDirection: 'column' },
    },
  },
});

export const inputStyle = recipe({
  base: {
    width: '100%',
    color: vars.color.gray50,
    backgroundColor: vars.color.gray700,
    border: 'none',
    fontSize: vars.fontSize['1x'],
  },
  variants: {
    inline: {
      true: { flexDirection: 'row' },
      false: { flexDirection: 'column' },
    },
  },
});

export type InputVariants = RecipeVariants<typeof inputStyle>;
