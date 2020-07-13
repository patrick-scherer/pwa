import { produce } from 'immer';
import { generateSortedHash } from '@shopgate/pwa-common/helpers/redux/generateSortedHash';
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_PRODUCT_LOCATIONS,
  RECEIVE_PRODUCT_LOCATIONS,
  STORE_FULFILLMENT_METHOD,
  SELECT_LOCATION,
} from '../constants';

const initialState = {
  // If any data is being fetched right now.
  isFetching: false,
  // The users preferred fulfillment location.
  preferredLocation: {
    code: null,
  },
  // The users preferred fulfillment method.
  preferredFulfillmentMethod: {
    type: null,
  },
  // All location information stored by code.
  locationsByCode: {},
  // Inventory for a specific location and product.
  inventoriesByCodePair: {},
  // List of locations that based on a given filter.
  locationsByFilter: {},
};

/* eslint-disable no-param-reassign */

/**
 * Stores a list of locations and updates the store.
 * @param {Object} draft Draft
 * @param {Array} locations Locations
 */
const storeLocationData = (draft, locations) => {
  locations.forEach((location) => {
    // Remove some situational data to avoid confusion.
    // The location storage should only contain the raw location info.
    const { productInventory, ...filteredData } = location;
    draft.locationsByCode[location.code] = filteredData;

    // Enhance with primary address for easier lookup.
    draft.locationsByCode[location.code].address = location.addresses
      .find(a => a.isPrimary) || location.addresses[0];
  });
};

export default (state = initialState, action) => {
  const producer = produce((draft) => {
    switch (action.type) {
      case REQUEST_LOCATIONS:
      case REQUEST_PRODUCT_LOCATIONS:
        draft.isFetching = true;
        break;

      case RECEIVE_LOCATIONS: {
        // Store all missing locations.
        storeLocationData(draft, action.locations);

        // Store filtered result set.
        const locationCodes = action.locations.map(l => l.code);
        const filter = generateSortedHash({ ...action.filters });
        draft.locationsByFilter[filter] = locationCodes;
        draft.isFetching = false;
        break;
      }

      case RECEIVE_PRODUCT_LOCATIONS: {
        // Store all missing locations.
        storeLocationData(draft, action.locations);

        // For each location we store a new inventory entry.
        action.locations.forEach((location) => {
          const key = generateSortedHash({
            productCode: action.productCode,
            locationCode: location.code,
          });
          draft.inventoriesByCodePair[key] = location.productInventory;
        });

        // Store filtered result set.
        const filter = generateSortedHash({
          productCode: action.productCode,
          ...action.filters,
        });
        const locationCodes = action.locations.map(l => l.code);
        draft.locationsByFilter[filter] = locationCodes;
        draft.isFetching = false;
        break;
      }

      case STORE_FULFILLMENT_METHOD:
        draft.preferredFulfillmentMethod.type = action.method;
        break;

      case SELECT_LOCATION:
        draft.preferredLocation.code = action.location?.code || null;
        break;

      default:
        break;
    }
  });
  return producer(state);
};

/* eslint-enable no-param-reassign */
