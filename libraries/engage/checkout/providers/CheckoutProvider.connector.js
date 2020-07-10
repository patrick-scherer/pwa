import { connect } from 'react-redux';
import { getShopSettings, getConfigFetching } from '@shopgate/engage/core/config';
import { getPreferredLocationAddress } from '@shopgate/engage/locations/selectors';
import {
  getCheckoutOrder,
  getCheckoutBillingAddress,
  getCheckoutPickupAddress,
  getCheckoutTaxLines,
  getCheckoutPaymentTransactions,
  getIsReserveOnly,
} from '@shopgate/engage/checkout/selectors/order';
import { getNeedsPaymentForOrder } from '@shopgate/engage/checkout/selectors/payment';
import { fetchCart } from '@shopgate/pwa-common-commerce/cart';
import {
  prepareCheckout,
  fetchCheckoutOrder,
  fetchPaymentMethods,
  updateCheckoutOrder,
  submitCheckoutOrder,
} from '@shopgate/engage/checkout';
import { historyReplace } from '@shopgate/engage/core';

/**
 * @returns {Function}
 */
function makeMapStateToProps() {
  /**
   * @param {Object} state The application state.
   * @returns {Object}
   */
  return state => ({
    isDataReady: !getConfigFetching(state) && !!getCheckoutOrder(state),
    needsPayment: getNeedsPaymentForOrder(state) || false,
    paymentTransactions: getCheckoutPaymentTransactions(state),
    shopSettings: getShopSettings(state),
    userLocation: getPreferredLocationAddress(state),
    billingAddress: getCheckoutBillingAddress(state),
    pickupAddress: getCheckoutPickupAddress(state),
    taxLines: getCheckoutTaxLines(state),
    orderReserveOnly: getIsReserveOnly(state),
  });
}

const mapDispatchToProps = {
  historyReplace,
  fetchCart,
  prepareCheckout,
  fetchCheckoutOrder,
  updateCheckoutOrder,
  fetchPaymentMethods,
  submitCheckoutOrder,
};

export default connect(makeMapStateToProps, mapDispatchToProps);
