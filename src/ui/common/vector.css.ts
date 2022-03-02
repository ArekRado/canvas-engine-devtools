import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const vectorContainerStyle = recipe({
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

export const vectorStyle = recipe({
  base: {
    width: '100%',
    height: '100%',
    color: vars.color.gray50,
    backgroundColor: vars.color.gray700,
    border: 'none',
  },
});

export type VectorVariants = RecipeVariants<typeof vectorContainerStyle>;
