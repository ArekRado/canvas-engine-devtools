import { style } from '@vanilla-extract/css';
import { vars } from '../vars.css';

export const modalStyle = style({
  background: vars.color.gray900,
  position: 'fixed',
  top: '30%',
  padding: vars.space['32x'],
  zIndex: vars.zIndex.modal,
});
