import React, { useContext } from 'react';
import { i18n } from '../../../core/helpers/i18n';
import FulfillmentContext from '../context';
import {
  container, heading, body, orderNum,
} from './ReservationResponse.style';

/**
 * Renders the reservation success screen.
 * @returns {JSX}
 */
function ReservationSuccess() {
  const { orderNumbers } = useContext(FulfillmentContext);

  return (
    <div className={container}>
      <h2 className={heading}>
        {i18n.text('locations.success_title')}
      </h2>
      <p className={body}>
        {i18n.text('locations.success_copy')}
      </p>
      <p className={body}>
        {i18n.text('locations.success_order_num')}
      </p>
      <p className={orderNum}>
        {orderNumbers[0]}
      </p>
    </div>
  );
}

export default ReservationSuccess;