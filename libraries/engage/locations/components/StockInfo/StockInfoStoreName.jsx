import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../core';
import { I18n } from '../../../components';

/**
 * Renders the given store name if one is set and capitalizes the resulting text if asked for.
 * @param {string} props.name The name to display.
 * @param {Object} props.displayCapitalized If set, the translated text will be capitalized.
 * @return {JSX}
 */
function StoreName({ name, displayCapitalized }) {
  if (!name) {
    return null;
  }

  return (
    <I18n.Text
      string="locations.stock_info.pick_up_at"
      params={{ storeName: name }}
      transform={displayCapitalized ? capitalize : null}
    />
  );
}

StoreName.propTypes = {
  displayCapitalized: PropTypes.bool,
  name: PropTypes.string,
};

StoreName.defaultProps = {
  displayCapitalized: false,
  name: '',
};

export default StoreName;
