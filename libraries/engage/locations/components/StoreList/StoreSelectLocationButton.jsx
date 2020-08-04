import React, { useContext, useCallback } from 'react';
import { RippleButton } from '@shopgate/engage/components';
import { isProductAvailable } from '../../helpers';
import { StoreContext } from './Store.context';
import { i18n } from '../../../core';
import { FulfillmentContext } from '../../locations.context';
import { selectLocationButton, selectLocationButtonWrapper } from './Store.style';

/**
 * The StoreSelectLocationButton component.
 * @returns {JSX}
 */
export const StoreSelectLocationButton = () => {
  const store = useContext(StoreContext);
  const { selectLocation, noInventory } = useContext(FulfillmentContext);
  const isAvailable = isProductAvailable(store, store?.inventory);

  const handleClick = useCallback(() => {
    if (noInventory || isAvailable) {
      selectLocation(store);
    }
  }, [isAvailable, noInventory, selectLocation, store]);

  return (
    <div className={selectLocationButtonWrapper}>
      <RippleButton
        onClick={handleClick}
        className={selectLocationButton.toString()}
        disabled={!noInventory && !isAvailable}
      >
        {i18n.text('locations.select_location')}
      </RippleButton>
    </div>
  );
};