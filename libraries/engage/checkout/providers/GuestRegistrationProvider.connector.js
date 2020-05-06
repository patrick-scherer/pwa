import { connect } from 'react-redux';
import { getShopSettings, getConfigFetching } from '@shopgate/engage/core/config';
import { makeGetUserLocationAddress } from '@shopgate/engage/locations/selectors';
import {
  getCheckoutOrder,
  getCheckoutBillingAddress,
  getCheckoutPickupAddress,
  isPickupAndBillingEquals,
} from '@shopgate/engage/checkout/selectors/order';
import { getNeedsPaymentForOrder } from '@shopgate/engage/checkout/selectors/payment';
import {
  initializeCheckout,
  fetchCheckoutOrder,
  updateCheckoutOrder,
} from '@shopgate/engage/checkout';
import { historyReplace } from '@shopgate/engage/core';

/**
 * @returns {Function}
 */
function makeMapStateToProps() {
  const getUserLocationAddress = makeGetUserLocationAddress();

  /**
   * @param {Object} state The application state.
   * @returns {Object}
   */
  return state => ({
    isDataReady: !getConfigFetching(state) && !!getCheckoutOrder(state),
    needsPayment: getNeedsPaymentForOrder(state) || false,
    shopSettings: getShopSettings(state),
    userLocation: getUserLocationAddress(state),
    billingAddress: getCheckoutBillingAddress(state),
    pickupAddress: getCheckoutPickupAddress(state),
    billingPickupEquals: isPickupAndBillingEquals(state),
  });
}

const mapDispatchToProps = {
  historyReplace,
  fetchCheckoutOrder,
  initializeCheckout,
  updateCheckoutOrder,
};

export default connect(makeMapStateToProps, mapDispatchToProps);
