import React, { useContext, Fragment } from 'react';
import { ResponsiveContainer } from '@shopgate/engage/components';
import { StoreContext } from './Store.context';
import { StoreHeader } from './StoreHeader';
import { StoreDetails } from './StoreDetails';
import { StoreSelectLocationButton } from './StoreSelectLocationButton';

/**
 * Renders the store's card.
 * @returns {JSX}
 */
export function StoreCard() {
  const store = useContext(StoreContext);
  if (!store || !store.address) {
    return null;
  }

  return (
    <Fragment>
      <StoreHeader />
      <StoreDetails />
      <ResponsiveContainer breakpoint="<=sm" appAlways>
        <StoreSelectLocationButton />
      </ResponsiveContainer>
    </Fragment>
  );
}