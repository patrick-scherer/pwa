import { LoadingProvider, PipelineRequest } from '@shopgate/engage/core';
import { CHECKOUT_PATTERN } from '../constants/routes';
import {
  FETCH_CHECKOUT_ORDER,
  FETCH_CHECKOUT_ORDER_SUCCESS,
  FETCH_CHECKOUT_ORDER_ERROR,
} from '../constants/actionTypes';
import { ERROR_CODE_CHECKOUT_GENERIC } from '../constants/errorCodes';

/**
 * Starts entering the checkout process for the customer.
 * @returns {Function}
 */
export const fetchCheckoutOrder = () => async (dispatch) => {
  LoadingProvider.setLoading(CHECKOUT_PATTERN);
  dispatch({ type: FETCH_CHECKOUT_ORDER });

  const pipelineRequest = new PipelineRequest('shopgate.checkout.getOrder');

  try {
    const { order } = await pipelineRequest
      .setErrorBlacklist([ERROR_CODE_CHECKOUT_GENERIC])
      .dispatch();

    dispatch({
      type: FETCH_CHECKOUT_ORDER_SUCCESS,
      order,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHECKOUT_ORDER_ERROR,
      error,
    });
    LoadingProvider.unsetLoading(CHECKOUT_PATTERN);
  }
};
