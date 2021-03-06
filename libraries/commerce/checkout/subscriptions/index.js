import 'rxjs/add/operator/debounceTime';
import event from '@shopgate/pwa-core/classes/Event';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { historyReset } from '@shopgate/pwa-common/actions/router';
import successCheckout from '../action-creators/successCheckout';
import { checkoutSucceeded$ } from '../streams';
import { getCartProducts } from '../../cart/selectors';

/**
 * Checkout subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
const checkout = (subscribe) => {
  /**
   * Gets triggered when the app starts.
   */
  subscribe(appDidStart$, ({ dispatch, getState }) => {
    // Register for the app event that is triggered when the checkout process is finished
    registerEvents(['checkoutSuccess']);

    event.addCallback('checkoutSuccess', () => {
      dispatch(successCheckout(getCartProducts(getState())));
    });
  });

  /**
   * After success checkout
   */
  subscribe(checkoutSucceeded$, ({ dispatch }) => {
    // Reset navigation history
    dispatch(historyReset());
  });
};

export default checkout;
