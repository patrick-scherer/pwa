/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import {
  mockedStateWithoutReview,
  mockedStateWithAll,
} from 'Components/Reviews/mock';
import Header from './index';

const mockedStore = configureStore();

/**
 * Creates component with provided store state.
 * @param {Object} mockedState Mocked stage.
 * @param {Object|null} props Rating prop.
 * @return {ReactWrapper}
 */
const createComponent = (mockedState, props = {}) => mount(
  <Provider store={mockedStore(mockedState)}>
    <Header {...props} />
  </Provider>
);

describe('<Header />', () => {
  let header = null;
  it('should render empty', () => {
    header = createComponent(mockedStateWithoutReview);
    expect(header.find('Header').exists()).toBe(true);
    expect(header).toMatchSnapshot();
    expect(header.find('RatingStars').prop('value')).toEqual(0);
    expect(header.find('RatingCount').exists()).toBe(false);
  });

  it('should render rating summary', () => {
    const rating = mockedStateWithAll.product.productsById.foo.productData.rating;
    header = createComponent(mockedStateWithAll, { rating });
    expect(header.find('Header').exists()).toBe(true);
    expect(header).toMatchSnapshot();
    expect(header.find('RatingStars').prop('value')).toEqual(rating.average);
    expect(header.find('RatingCount').prop('count')).toEqual(rating.count);
  });
});
