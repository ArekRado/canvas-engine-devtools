import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const inputContainerStyle = recipe({
  variants: {
    type: {
      inline: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
    },
  },
});

export const inputStyle = recipe({
  base: {
    width: '100%',
    height: '100%',
    outline: vars.color.blue100,
    color: vars.color.gray50,
    backgroundColor: vars.color.gray700,
    border: 'none',
    ':focus': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
    },
  },
  variants: {
    type: {
      inline: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
    },
  },
});

export type InputVariants = RecipeVariants<typeof inputStyle>;
