import {
  REQUEST_PRODUCT_LOCATIONS,
  RECEIVE_PRODUCT_LOCATIONS,
  ERROR_PRODUCT_LOCATIONS,
} from '../constants';

/**
 * Stores the product locations by the ID of the product.
 * @param {Object} [state={}] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
export default function locationsByProductId(
  state = {},
  action
) {
  switch (action.type) {
    case REQUEST_PRODUCT_LOCATIONS:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          isFetching: true,
          expires: 0,
        },
      };
    case RECEIVE_PRODUCT_LOCATIONS:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          allLocations:
            !Object.keys(action.params).length
              ? action.locations
              : state[action.productId].allLocations,
          locations: action.locations.map(location => ({
            ...location,
            address: location.addresses.find(a => a.isPrimary) || location.addresses[0],
          })),
          isFetching: false,
        },
      };
    case ERROR_PRODUCT_LOCATIONS:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
