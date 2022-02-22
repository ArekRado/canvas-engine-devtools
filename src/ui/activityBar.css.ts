import { style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  minWidth: '30px',
  backgroundColor:vars.color.gray800,
});
