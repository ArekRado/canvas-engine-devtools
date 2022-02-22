import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const appStyle = style({
  // text-gray-500 bg-gray-900 w-full h-full flex
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: vars.color.gray500,
  backgroundColor: vars.color.gray900,
  width: '100%',
  height: '100%',
  display: 'flex',
});

globalStyle('*', {
  scrollbarWidth: 'thin',
});
