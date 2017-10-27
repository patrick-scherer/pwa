/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Icon from '@shopgate/pwa-common/components/Icon';

// SVG Content
const content = '<path d="M5.5,6C5.2,6,4.9,6.3,4.9,6.7c0,0,0,0,0,0v9l-1.3-1.1c-0.3-0.2-0.7-0.2-0.9,0.1 c-0.2,0.3-0.2,0.7,0.1,0.9l0,0l1,0.9l0,0l0.7,0.6L5,17.6l0,0L5.5,18l0,0L6,17.6l0.3-0.2l1-0.9l0,0l1-0.9c0.3-0.2,0.3-0.7,0.1-0.9 c-0.2-0.3-0.7-0.3-0.9-0.1l0,0l-1.3,1.1v-9C6.2,6.3,5.9,6,5.5,6C5.5,6,5.5,6,5.5,6L5.5,6z M10.4,6.1c-0.4,0-0.7,0.3-0.7,0.7 c0,0.4,0.3,0.7,0.7,0.7l0,0h10.3c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7H10.4z M10.4,9.5c-0.4,0-0.7,0.3-0.7,0.7 c0,0.4,0.3,0.7,0.7,0.7l0,0h8.1c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7H10.4z M10.4,12.9c-0.4,0-0.7,0.3-0.7,0.7 c0,0.4,0.3,0.7,0.7,0.7l0,0h5.8c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7H10.4z M10.4,16.3c-0.4,0-0.7,0.3-0.7,0.7 s0.3,0.7,0.7,0.7H14c0.4,0,0.7-0.3,0.7-0.7s-0.3-0.7-0.7-0.7l0,0H10.4z"/>';

/**
 * The sort icon component.
 * @param {Object} props The component properties.
 * @returns {JSX}
 */
const Sort = props => <Icon content={content} {...props} />;

export default Sort;
