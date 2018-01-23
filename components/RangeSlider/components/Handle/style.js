/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';

export default css({
  top: '50%',
  position: 'absolute',

  ':first-child': {
    left: 0,
    transform: 'translate(-50%, -50%)',
  },

  ':last-child': {
    left: 'auto',
    right: 0,
    transform: 'translate(50%, -50%)',
  },
});
