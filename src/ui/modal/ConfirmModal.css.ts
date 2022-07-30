import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const confirmModalTitle = style({
  color: vars.color.white,
  textAlign: 'center',
  marginBottom: vars.space['32x'],
});
