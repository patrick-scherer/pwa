/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import variables from 'Styles/variables';
import buttonStyles from 'Components/Button/style';

const container = css({
  margin: `0 ${variables.gap.big}px`,
}).toString();

const buttonLine = css({
  float: 'right',
}).toString();

/* TODO move to index */
const buttonstyle = buttonStyles.regular(false);
const button = `${buttonstyle.button} ${buttonstyle.content}`;

export default {
  container,
  buttonLine,
  button,
};
