import { style } from '@vanilla-extract/css';
import { vars } from '../../vars.css';

export const preStyle = style({
  overflow: 'auto',
  maxHeight: '800px',
  maxWidth: '100%',
  color: vars.color.gray200,
});
