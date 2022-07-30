import { style } from '@vanilla-extract/css';
import { vars } from '../../vars.css';

export const container = style({
  display: 'flex',
  flex: '1',
  maxWidth: '100%',
  zIndex: vars.zIndex.mainContainer,
  backgroundColor: vars.color.gray900
});

export const entitiesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '150px',
});

export const listContainer = style({
  padding: '2px 1px 2px 2px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
});

export const entityDetailsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const overEntityStyle = style({
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: vars.color.blue100,
});

export const entityHasChildrenStyle = style({
  paddingLeft: '4px',
});

export const entityIsFocusedStyle = style({
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: vars.color.blue100,
});
