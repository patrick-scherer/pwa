import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { RippleButton } from '@shopgate/engage/components';
import { i18n } from '@shopgate/engage/core';
import { toggleFavoriteWithListChooser } from '@shopgate/pwa-common-commerce/favorites/actions/toggleFavorites';
import appConfig from '@shopgate/pwa-common/helpers/config';

/**
 * @param {Function} dispatch Dispatch
 * @returns {Object}
 * */
const mapDispatchToProps = dispatch => ({
  toggle: productId => dispatch(toggleFavoriteWithListChooser(productId)),
});

const styles = {
  root: css({
    '&&': {
      margin: '0 0px 16px 16px',
      backgroundColor: '#fff',
      border: '1px solid var(--color-primary)',
      color: 'var(--color-high-emphasis)',
      borderRadius: 5,
      fontSize: 14,
      textTransform: 'none',
      padding: 0,
    },
  }).toString(),
  ripple: css({
    padding: '8px 16px',
  }).toString(),
};

/** @returns {JSX} */
const FavoriteButtonWide = ({ productId, toggle }) => (appConfig.hasFavorites ? (
  <RippleButton
    className={styles.root}
    rippleClassName={styles.ripple}
    type="primary"
    onClick={() => toggle(productId)}
  >
    {i18n.text('favorites.add_to_list')}
  </RippleButton>
) : null);

FavoriteButtonWide.propTypes = {
  productId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteButtonWide);
