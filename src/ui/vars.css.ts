import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    '1x': '1px',
    '2x': '2px',
    '4x': '4px',
    '8x': '8px',
    '16x': '16px',
    '32x': '32px',
  },
  color: {
    white: '#fff',

    // blue
    // blue50: '#EFF6FF',
    blue100: '#DBEAFE',
    // blue200: '#BFDBFE',
    // blue300: '#93C5FD',
    // blue400: '#60A5FA',
    // blue500: '#3B82F6',
    // blue600: '#2563EB',
    // blue700: '#1D4ED8',
    // blue800: '#1E40AF',
    // blue900: '#1E3A8A',

    // red
    // red50: '#FEF2F2',
    // red100: '#FEE2E2',
    // red200: '#FECACA',
    // red300: '#FCA5A5',
    // red400: '#F87171',
    // red500: '#EF4444',
    // red600: '#DC2626',
    // red700: '#B91C1C',
    // red800: '#991B1B',
    // red900: '#7F1D1D',

    // gray
    gray50: '#F9FAFB',
    // gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    // gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
  borderRadius: {
    full: '99999px',
  },
  fontFamily: {
    body: 'Arial, Helvetica, sans-serif',
  },
  fontSize: {
    '0.5x': '6px',
    '0.75x': '9px',
    '1x': '12px',
    '1.5x': '16px',
    '2x': '24px',
  },
  lineHeight: {
    '0x': '10px',
    '1x': '11px',
    '2x': '12px',
    '3x': '13px',
    '4x': '14px',
    '5x': '15px',
  },
  zIndex: {
    modal: '5',
    activityBar: '4',
    mainContainer: '3',
    playButton: '2',
  },
});
