import { style } from '@vanilla-extract/css';
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from './vars.css';

export const text1 = style({
  color: vars.color.gray300,
});

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    // tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex'],
    flexDirection: ['row', 'column'],
    alignItems: ['flex-start', 'center', 'flex-end'],
    justifyContent: [
      // 'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      // 'space-around',
      // 'space-evenly',
    ],
    flex: ['1', '2'],
    // gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    width: ['100%'],
    height: ['100%'],
    // borderRadius: vars.borderRadius,
    // fontFamily: vars.fontFamily,
    fontSize: vars.fontSize,
    // lineHeight: vars.lineHeight,
    textAlign: ['left', 'center'],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    // paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    // marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    // placeItems: ['alignItems', 'justifyContent'],
    // typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorModeProperties = defineProperties({
  conditions: {
    lightMode: {},
    // darkMode: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: 'lightMode',
  properties: {
    color: vars.color,
    background: vars.color,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorModeProperties
);
