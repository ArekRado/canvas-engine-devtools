import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flex: '1',
  maxWidth: '100%',
});

export const listContainer = style({
  // py-2 pl-2 pr-1 flex flex-col flex-1 overflow-y-hidden
  padding: '2px 1px 2px 2px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
});
