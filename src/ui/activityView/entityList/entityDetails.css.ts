import { style } from '@vanilla-extract/css';
import { vars } from '../../vars.css';

export const entityDetailsStyle = style({
  flex: '1',
  maxWidth: '500px',
  padding: `${vars.space['2x']} ${vars.space['1x']}`,
});
