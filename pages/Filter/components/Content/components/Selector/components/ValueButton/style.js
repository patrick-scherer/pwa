import { css } from 'glamor';

export const inactive = css({
  display: 'flex',
  borderRadius: 2,
  justifyContent: 'center',
  outline: 0,
  lineHeight: 1,
  padding: '0 8px',
  border: '1px solid #ebebeb',
  marginLeft: 8,
  marginBottom: 8,
  height: 42,
  minWidth: 42,
  flexShrink: 0,
});

export const active = css(inactive, {
  borderColor: '#5ccee3',
  color: '#5ccee3',
});
