// @flow
import React, { useContext, Fragment } from 'react';
import { ResponsiveContainer } from '@shopgate/engage/components';
import { FulfillmentContext } from '../../locations.context';
import { Accordion } from '../../../components';
import { StoreContext } from './Store.context';
import { StockInfo } from '../StockInfo';
import { StoreOpeningHours } from './StoreOpeningHours';
import { StoreAddress } from './StoreAddress';
import { StorePhoneNumber } from './StorePhoneNumber';
import { StoreAddressShort } from './StoreAddressShort';
import { storeDetailsBody, storeDetailsStaticBody } from './Store.style';

/**
 * Renders a single store details.
 * @returns {JSX}
 */
export function StoreDetails() {
  const store = useContext(StoreContext);
  const { isStoreFinder } = useContext(FulfillmentContext);

  /**
   * Renders the header
   * @returns {JSX}
   */
  const renderHeader = () => (
    <Fragment>
      <StoreAddress address={store.address} />
      <ResponsiveContainer breakpoint="<=sm" appAlways>
        <StockInfo location={store} showStoreName={false} />
      </ResponsiveContainer>
    </Fragment>
  );

  if (!store) {
    return null;
  }

  if (isStoreFinder) {
    // TODO Make that dynamic
    return (
      <div className={storeDetailsStaticBody}>
        {renderHeader()}
      </div>
    );
  }

  return (

    <Accordion
      renderLabel={renderHeader}
      contentClassName={storeDetailsBody}
    >
      <StoreOpeningHours hours={store.operationHours} />
      {store.address && <StorePhoneNumber phone={store.address.phoneNumber} />}
      <StoreAddressShort showFull address={store.address} />
    </Accordion>
  );
}
