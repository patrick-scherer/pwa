import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { ResponsiveContainer, RippleButton } from '@shopgate/engage/components';
import { responsiveMediaQuery } from '@shopgate/engage/styles';
import { CartItems } from '@shopgate/engage/cart';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

import { i18n } from '../../../core/helpers/i18n';
import CheckoutConfirmationPickUpContact from './CheckoutConfirmationPickUpContact';
import CheckoutConfirmationPickupNotes from './CheckoutConfirmationPickupNotes';
import CheckoutConfirmationBilledTo from './CheckoutConfirmationBilledTo';
import CheckoutConfirmationOrderSummary from './CheckoutConfirmationOrderSummary';
import connect from './CheckoutConfirmation.connector';

const { variables } = themeConfig;

const style = {
  root: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  main: css({
    flex: 1,
    [responsiveMediaQuery('>=md', { webOnly: true })]: {
      paddingRight: 16,
    },
  }),
  side: css({
    [responsiveMediaQuery('>=md', { webOnly: true })]: {
      marginTop: 16,
      flex: 0.6,
    },
  }),
  container: css({
    padding: `${variables.gap.big}px ${variables.gap.small * 1.5}px 0 ${variables.gap.small * 1.5}px`,
  }),
  heading: css({
    fontSize: '1.125rem',
    fontWeight: 'bold',
  }),
  yourItemsHeading: css({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    margin: `${variables.gap.bigger}px 0 0`,
  }),
  body: css({
    padding: `${variables.gap.big}px 0 0`,
    margin: `0 0 ${variables.gap.bigger}px`,
    border: 0,
  }),
  orderNum: css({
    padding: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: `0 0 ${variables.gap.big}px`,
    border: 0,
  }),
  button: css({
    flex: '0 0 auto',
    margin: `${variables.gap.big * 1.5}px ${variables.gap.small * 1.5}px ${variables.gap.xbig}px ${variables.gap.small * 1.5}px`,
    borderRadius: 2,
  }),
};

/**
 * CheckoutConfirmation component
 * @returns {JSX}
 */
const CheckoutConfirmation = ({ order, cartItems, onContinueShopping }) => {
  if (!order || !cartItems) {
    return null;
  }

  const { orderNumber, date } = order;

  return (
    <div className={style.root}>
      <div className={style.main}>
        <div className={style.container}>
          <h2 className={style.heading}>
            {i18n.text('checkout.success.title')}
          </h2>
          <p className={style.body}>
            {i18n.text('checkout.success.copy')}
          </p>
          <p className={style.orderNum}>
            {i18n.text('checkout.success.order_date', { date: i18n.date(new Date(date).getTime(), 'short') })}
            <br />
            {i18n.text('checkout.success.order_number', { orderNumber })}
          </p>
          <h3 className={style.yourItemsHeading}>{i18n.text('checkout.success.your_items')}</h3>
        </div>

        <CartItems
          cartItems={cartItems}
          onFocus={() => { }}
          multiLineReservation
          editable={false}
        />

        <CheckoutConfirmationPickupNotes order={order} />

        <ResponsiveContainer breakpoint="<md" appAlways>
          <CheckoutConfirmationPickUpContact order={order} />
          <CheckoutConfirmationBilledTo order={order} />
          <CheckoutConfirmationOrderSummary order={order} />
        </ResponsiveContainer>

        <RippleButton
          type="secondary"
          disabled={false}
          className={style.button.toString()}
          onClick={onContinueShopping}
        >
          {i18n.text('checkout.success.continue')}
        </RippleButton>
      </div>
      <div className={style.side}>
        <ResponsiveContainer breakpoint=">=md" webOnly>
          <CheckoutConfirmationPickUpContact order={order} />
          <CheckoutConfirmationBilledTo order={order} />
          <CheckoutConfirmationOrderSummary order={order} />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

CheckoutConfirmation.defaultProps = {
  cartItems: null,
  order: null,
};

CheckoutConfirmation.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape()),
  order: PropTypes.shape(),
};

export default connect(CheckoutConfirmation);