import get from 'lodash/get';
import find from 'lodash/find';
import { logger } from '@shopgate/pwa-core/helpers';
import { parseShopgateQrCode } from '@shopgate/pwa-common/helpers/data';
import {
  QR_CODE_TYPE_HOMEPAGE,
  QR_CODE_TYPE_PRODUCT,
  QR_CODE_TYPE_PRODUCT_WITH_COUPON,
  QR_CODE_TYPE_COUPON,
  QR_CODE_TYPE_CATEGORY,
  QR_CODE_TYPE_SEARCH,
  QR_CODE_TYPE_PAGE,
} from '@shopgate/pwa-common/constants/QRCodeTypes';
import core from '@shopgate/tracking-core/core/Core';
import { SCANNER_TYPE_QR, SCANNER_FORMAT_QR_CODE } from '../constants';

/**
 * Converts a price to a formatted string.
 * @param {number} price The original price.
 * @return {string|*} The converted price or the original value, if the price was not convertible.
 */
export const convertPriceToString = (price) => {
  if (typeof price === 'number') {
    return price.toFixed(2);
  }

  return price;
};

/**
 * Re-format a given product form the store.
 * @param {Object} productData The product data from the store
 * @returns {Object|null} The formatted product.
 */
export const formatProductData = (productData) => {
  if (!productData) {
    return null;
  }

  const {
    id,
    name,
    price,
    manufacturer,
    tags = [],
  } = productData;

  return {
    name,
    manufacturer,
    tags,
    uid: id,
    amount: {
      net: convertPriceToString(price.unitPriceNet),
      gross: convertPriceToString(price.unitPriceWithTax),
      striked: convertPriceToString(price.unitPriceStriked),
      currency: price.currency,
    },
  };
};

/**
 * Reformat product data for addToCart from the store to the format our core expects.
 * @param {Object} product Product from the store
 * @param {Object} quantity Quantity of the product
 * @return {Object}
 */
export const formatAddToCartProductData = ({ product, quantity }) => ({
  ...formatProductData(product),
  quantity,
});

/**
 * Reformat product data from the store to the format our core expects.
 * @param {Object} product Product from the store
 * @param {Object} quantity Quantity of the product
 * @return {Object}
 */
export const formatCartProductData = ({ product, quantity }) => ({
  uid: product.id,
  name: product.name,
  amount: {
    gross: convertPriceToString(product.price.unit),
  },
  quantity,
});

/**
 * Reformat order data from web checkout to the format our core expects.
 * @param {Object} passedOrder Information about the order.
 * @return {Object}
 */
export const formatPurchaseData = (passedOrder) => {
  // Return the passedOrder if the format is already correct
  if (!passedOrder.totals && passedOrder.amount) {
    return {
      order: passedOrder,
    };
  }

  const defaults = {
    totals: [],
    products: [],
    number: '',
    currency: '',
  };

  const order = {
    ...defaults,
    ...passedOrder,
  };

  const { amount: grandTotal = 0 } = find(order.totals, { type: 'grandTotal' }) || {};
  const { amount: shipping = 0 } = find(order.totals, { type: 'shipping' }) || {};
  const { amount: tax = 0 } = find(order.totals, { type: 'tax' }) || {};
  const grandTotalNet = grandTotal - tax;

  const products = order.products.map(product => ({
    uid: product.id || '',
    productNumber: product.id || '',
    name: product.name || '',
    quantity: product.quantity || 1,
    amount: {
      currency: order.currency,
      gross: convertPriceToString(get(product, 'price.withTax', 0)),
      net: convertPriceToString(get(product, 'price.net', 0)),
    },
  }));

  return {
    shop: {
      name: '',
    },
    order: {
      number: order.number,
      amount: {
        currency: order.currency,
        gross: convertPriceToString(grandTotal),
        net: convertPriceToString(grandTotalNet),
        tax: convertPriceToString(tax),
      },
      shipping: {
        amount: {
          gross: convertPriceToString(shipping),
          net: convertPriceToString(shipping),
        },
      },
      products,
      shippingAddress: {
        city: '',
        country: '',
      },
    },
  };
};

/**
 * Creates data for the scanner tracking events.
 * @param {Object} params Foobar
 * @return {Object}
 */
export const createScannerEventData = ({
  event, type, payload, url, userInteraction,
}) => {
  let eventLabel = [];

  if (type === SCANNER_TYPE_QR && payload) {
    const { format, code } = payload;

    eventLabel = [format];

    if (format === SCANNER_FORMAT_QR_CODE) {
      const parsedCode = parseShopgateQrCode(code);

      if (parsedCode) {
        const { type: qrType, link, data } = parsedCode;

        switch (qrType) {
          case QR_CODE_TYPE_HOMEPAGE:
            eventLabel.push('main');
            break;
          case QR_CODE_TYPE_PRODUCT:
            eventLabel.push('item_number');
            eventLabel.push(data.productId);
            break;
          case QR_CODE_TYPE_PRODUCT_WITH_COUPON:
            eventLabel.push('coupon_code');
            eventLabel.push(data.couponCode);
            break;
          case QR_CODE_TYPE_COUPON:
            eventLabel.push('coupon');
            break;
          case QR_CODE_TYPE_CATEGORY:
            eventLabel.push('categoryNumber');
            eventLabel.push(data.categoryId);
            break;
          case QR_CODE_TYPE_SEARCH:
          case QR_CODE_TYPE_PAGE:
            eventLabel.push(link);
            break;
          default:
            break;
        }
      }
    } else {
      if (code) {
        eventLabel.push(code);
      }

      if (url) {
        eventLabel.push(url);
      }
    }
  }

  eventLabel = eventLabel.join(' - ');

  return {
    eventAction: event,
    ...eventLabel && { eventLabel },
    ...(typeof userInteraction === 'boolean') && { userInteraction },
  };
};

/**
 * Helper to pass the redux state to the tracking core
 * @param {string} eventName The name of the event.
 * @param {Object} data The tracking data of the event.
 * @param {Object} state The current redux state.
 * @return {Core|boolean}
 */
export const track = (eventName, data, state) => {
  if (typeof core.track[eventName] !== 'function') {
    logger.warn('Unknown tracking event:', eventName);
    return false;
  }

  try {
    core.track[eventName](data, undefined, undefined, state);
  } catch (e) {
    logger.error(e);
  }

  return core;
};
