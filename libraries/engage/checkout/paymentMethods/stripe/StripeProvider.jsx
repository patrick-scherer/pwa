import React, { useEffect, useContext } from 'react';
import { i18n } from '@shopgate/engage/core';
import {
  Elements, CardNumberElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import Context from './StripeProvider.context';
import connect from './StripeProvider.connector';
import { promise as stripePromise, loadSdk } from './sdk';
import { useCheckoutContext } from '../../hooks/common';
import PaymentContext from '../context';

type PropsWrapper = {
  publishableKey?: string,
  children: any,
}

type Props = {
  children: any,
}

/**
 * Triggers the payment using stripe payment request api.
 * @param {Object} stripe Stripe
 * @param {Object} req Stripe Request
 * @param {Object} order Order
 * @param {Object} activeTransaction Active request
 * @returns {Promise}
 */
const triggerStripeRequest = (stripe, req, order, activeTransaction) =>
  new Promise(async (resolve, reject) => {
  // Update totals if they updated due to promotions etc.
    const intent = activeTransaction?.checkoutParams?.paymentIntent;
    req.update({
      total: {
        amount: Math.round(order.total * 100),
        label: 'Checkout',
      },
    });

    // Recheck availability again.
    const availability = await req.canMakePayment();
    if (!availability) {
      reject(availability);
      return;
    }
    req.show();

    // Handle success
    req.on('paymentmethod', async (event) => {
    /* eslint-disable camelcase */
      const result = await stripe.confirmCardPayment(intent,
        { payment_method: event.paymentMethod.id },
        { handleActions: false });
      /* eslint-enable camelcase */

      if (result.error) {
        event.complete('fail');
        reject(result.error);
        return;
      }

      event.complete('success');

      if (result.paymentIntent.status === 'requires_action') {
        const step = await stripe.confirmCardPayment(intent);
        if (step.error) {
          reject(step);
          return;
        }
        resolve(step);
        return;
      }

      resolve(result);
    });

    // Handle cancellation
    req.on('cancel', (err) => {
      reject(err);
    });
  });

/**
 * A Provider that is needed for all stripe based
 * @param {Object} props The components props.
 * @returns {JSX}
 */
const StripeProvider = ({ children }: Props) => {
  const [error, setError] = React.useState(null);
  const { order, paymentData } = useCheckoutContext();
  const stripe = useStripe();
  const elements = useElements();

  const contextApi = React.useMemo(() => ({
    error,
    setError,
    fulfillTransaction: async ({ paymentTransactions }) => {
      // Make sure api responded with a new payment transaction.
      const activeTransaction = paymentTransactions[0];
      if (!activeTransaction?.checkoutParams?.paymentIntent) {
        setError(i18n.text('checkout.errors.noPaymentTransaction'));
        return false;
      }

      // Handle stripe payment button request.
      if (paymentData?.meta && paymentData?.meta.stripeRequest) {
        try {
          const { paymentIntent } = await triggerStripeRequest(
            stripe,
            paymentData.meta.stripeRequest,
            order,
            activeTransaction
          );
          return [{
            id: activeTransaction.id,
            checkoutParams: {
              paymentIntentId: paymentIntent.id,
            },
          }];
        } catch (_error) {
          return false;
        }
      }

      // Handle regular payment.
      const {
        error: incomingError,
        paymentIntent,
      } = await stripe.confirmCardPayment(activeTransaction.checkoutParams.paymentIntent, {
        /* eslint-disable-next-line camelcase */
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (incomingError) {
        console.error(incomingError, activeTransaction.checkoutParams.paymentIntent);
        setError(incomingError.message);
        return false;
      }

      return [{
        id: activeTransaction.id,
        checkoutParams: {
          paymentIntentId: paymentIntent.id,
        },
      }];
    },
  }), [elements, error, order, paymentData, stripe]);

  const { registerPaymentMethod } = useContext(PaymentContext);
  useEffect(() => {
    registerPaymentMethod(contextApi);
  }, [contextApi, registerPaymentMethod]);

  return (
    <Context.Provider value={contextApi}>
      {children}
    </Context.Provider>
  );
};

/**
 * A Provider that is needed for all stripe based
 * @param {Object} props The components props.
 * @returns {JSX}
 */
const StripeProviderWrapper = ({ publishableKey, children }: PropsWrapper) => {
  React.useEffect(() => {
    if (!publishableKey) {
      return;
    }

    loadSdk(publishableKey);
  }, [publishableKey]);

  return (
    <Elements stripe={stripePromise}>
      <StripeProvider>
        {children}
      </StripeProvider>
    </Elements>
  );
};

StripeProviderWrapper.defaultProps = {
  publishableKey: null,
};

export default connect(StripeProviderWrapper);