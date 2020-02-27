// @flow
import { connect } from 'react-redux';
import { makeGetMerchantSettings } from '@shopgate/engage/core';
import {
  makeGetFulfillmentMethods,
  makeIsFulfillmentSelectorDisabled,
  makeGetUserLocation,
  makeGetProductLocation,
} from '../../selectors';
import { storeFulfillmentMethod } from '../../action-creators';
import { type OwnProps, type StateProps, type DispatchProps } from './FulfillmentSelector.types';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
function makeMapStateToProps() {
  const getUserLocation = makeGetUserLocation();
  const getFulfillmentMethods = makeGetFulfillmentMethods();
  const isFulfillmentSelectorDisabled = makeIsFulfillmentSelectorDisabled();
  const getProductLocation = makeGetProductLocation();
  const getMerchantSettings = makeGetMerchantSettings();

  /**
   * @param {Object} state The application state.
   * @param {Object} props The component props.
   * @returns {Object}
   */
  return (state, props) => {
    const { code: locationId } = getUserLocation(state);
    const productLocation = getProductLocation(state, {
      ...props,
      locationId,
    });
    const { enabledFulfillmentMethodSelectionForEngage = [] } = getMerchantSettings(state);

    return {
      fulfillmentPaths: enabledFulfillmentMethodSelectionForEngage,
      fulfillmentMethods: getFulfillmentMethods(state, props),
      location: productLocation || getUserLocation(state),
      disabled: isFulfillmentSelectorDisabled(state, props),
    };
  };
}

const mapDispatchToProps = {
  storeFulfillmentMethod,
};

export default connect<StateProps, DispatchProps, OwnProps>(
  makeMapStateToProps,
  mapDispatchToProps
);
