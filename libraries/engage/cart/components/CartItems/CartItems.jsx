// @flow
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { CardList } from '@shopgate/engage/components';
import { type Item } from '../../cart.types';
import { CartItem } from '../CartItem';
import { CartItemCard } from './CartItemCard';
import { items, card } from './CartItems.style';

type Props = {
  cartItems?: Item[],
  multiLineReservation?: boolean,
  onFocus: (hidden: boolean) => void,
  editable?: boolean
}

/**
 * Renders the cart items.
 * @param {Object} props The component props.
 * @returns {JSX.Element}
 */
function CartItems({
  cartItems, onFocus, multiLineReservation, editable,
}: Props) {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <CardList className={items}>
      {cartItems.map(item => (
        <CardList.Item className={card} key={item.id}>
          <ul>
            <CartItemCard
              multiLineReservation={multiLineReservation}
              fulfillmentLocationId={item.fulfillmentLocationId}
              fulfillmentMethod={item.fulfillmentMethod}
            >
              <CartItem item={item} onFocus={onFocus} editable={editable} />
            </CartItemCard>
          </ul>
        </CardList.Item>
      ))}
    </CardList>
  );
}

CartItems.defaultProps = {
  cartItems: null,
  multiLineReservation: null,
  editable: true,
};

export default hot(CartItems);
