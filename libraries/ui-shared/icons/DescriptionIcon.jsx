import React from 'react';
import Icon from '@shopgate/pwa-common/components/Icon';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

/**
 * The description icon component.
 * @param {Object} props The icon component properties.
 * @returns {JSX}
 */
const Description = props => <Icon content={themeConfig.icons.description} {...props} />;

export default Description;
