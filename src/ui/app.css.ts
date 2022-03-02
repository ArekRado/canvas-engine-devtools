import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const appStyle = style({
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: vars.color.gray500,
  backgroundColor: vars.color.gray900,
  maxWidth: '100%',
  maxHeight: '100%',
  display: 'flex',
  fontSize: vars.fontSize['1x'],
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '2',
});

globalStyle('#canvas-engine-devtools *', {
  scrollbarWidth: 'thin',
});

globalStyle('#canvas-engine-devtools.enable-outline *:focus', {
  outlineColor: vars.color.blue100,
  outlineWidth: '2px',
  outlineStyle: 'solid',
});
