import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../vars.css';

export const selectStyle = style({
  width: '100%',
  color: vars.color.gray50,
  backgroundColor: vars.color.gray700,
  border: 'none',
  padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
  fontSize: vars.fontSize['1x'],
});

export const selectContainerStyle = recipe({
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

export type SelectVariants = RecipeVariants<typeof selectContainerStyle>;
