import { RECEIVE_PRODUCT_OPTIONS } from '../constants';

/**
 * Dispatches the RECEIVE_PRODUCT_OPTIONS action.
 * @param {string} productId The ID of the product for which the options are requested.
 * @param {Object} options The data of the received product options.
 * @return {Object} The RECEIVE_PRODUCT_OPTIONS action.
 */
const receiveProductOptions = (productId, options) => ({
  type: RECEIVE_PRODUCT_OPTIONS,
  productId,
  options,
});

export default receiveProductOptions;
