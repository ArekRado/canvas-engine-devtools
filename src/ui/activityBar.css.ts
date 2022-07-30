import { style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '30px',
  backgroundColor: vars.color.gray800,
  zIndex: vars.zIndex.activityBar,
});
