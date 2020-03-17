import { ROPIS } from '../locations';

/**
 * Group cart items for view
 * @param {Object[]} cartItems cartItems
 * @returns {Object} The grouped cart items.
 */
export function groupCartItems(cartItems) {
  return cartItems.reduce((acc, cartItem) => {
    const { fulfillment = null } = cartItem;
    const { method, location: { code } = {} } = fulfillment || {};

    let groupType = cartItem.type;
    if (code && method === ROPIS) {
      groupType = code;
    }

    if (!acc[groupType]) {
      acc[groupType] = {
        fulfillmentLocationId: method === ROPIS ? code : null,
        items: [],
      };
    }

    acc[groupType].items.push(cartItem);
    return acc;
  }, {});
}
