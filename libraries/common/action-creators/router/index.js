import {
  NAVIGATE,
  ROUTE_WILL_ENTER,
  ROUTE_DID_ENTER,
  ROUTE_WILL_LEAVE,
  ROUTE_DID_LEAVE,
} from '../../constants/ActionTypes';

/**
 * Creates the dispatched NAVIGATE action object.
 * @param {string} action The desired history action.
 * @param {string} location The desired history location.
 * @param {Object} state The desired history state.
 * @return {Object} The dispatched action object.
 */
export const navigate = (action, location, state) => ({
  type: NAVIGATE,
  action,
  location,
  state,
});

/**
 * Creates the dispatched ROUTE_WILL_ENTER action object.
 * @param {Object} route The route object.
 * @return {Object} The dispatched action object.
 */
export const routeWillEnter = route => ({
  type: ROUTE_WILL_ENTER,
  route,
});

/**
 * Creates the dispatched ROUTE_DID_ENTER action object.
 * @param {Object} route The route object.
 * @return {Object} The dispatched action object.
 */
export const routeDidEnter = route => ({
  type: ROUTE_DID_ENTER,
  route,
});

/**
 * Creates the dispatched ROUTE_WILL_LEAVE action object.
 * @param {Object} route The route object.
 * @return {Object} The dispatched action object.
 */
export const routeWillLeave = route => ({
  type: ROUTE_WILL_LEAVE,
  route,
});

/**
 * Creates the dispatched ROUTE_DID_LEAVE action object.
 * @param {Object} route The route object.
 * @return {Object} The dispatched action object.
 */
export const routeDidLeave = route => ({
  type: ROUTE_DID_LEAVE,
  route,
});
