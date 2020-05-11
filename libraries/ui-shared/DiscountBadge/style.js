import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;
const badge = {
  // Before the custom properties the primary color was used for this class.
  background: `var(--color-secondary, ${colors.primary})`,
  borderRadius: 2,
  color: `var(--color-secondary-contrast, ${colors.primaryContrast})`,
  paddingTop: 5,
  paddingBottom: 5,
  width: '100%',
  fontWeight: 700,
  textAlign: 'center',
  display: 'inline-block',
  lineHeight: 1,
  ...themeConfig.variables.discountBadgeBase,
};

/**
 * The discount badge styles that can be selected by passing the style key.
 * @type {Object}
 */
export default {
  small: css({
    ...badge,
  }).toString(),
  big: css({
    ...badge,
    paddingTop: 7,
    paddingLeft: 5,
    paddingRight: 5,
  }).toString(),
};
