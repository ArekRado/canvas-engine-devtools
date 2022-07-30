import { style } from '@vanilla-extract/css';
import { vars } from '../../vars.css';

export const container = style({
  display: 'flex',
  flex: '1',
  maxWidth: '100%',
  flexDirection: 'column',
  zIndex: vars.zIndex.mainContainer,
  backgroundColor: vars.color.gray900,
});

export const searchInputLabel = style({
  marginRight: '5px',
});

export const searchInputContainer = style({
  margin: '5px 10px 5px 0px',
});

export const list = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  overflow: 'auto',
});

export const preStyle = style({
  overflow: 'auto',
  maxHeight: '800px',
  maxWidth: '100%',
  color: vars.color.gray200,
});
