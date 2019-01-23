import React, { Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import showReturnPolicy from '@shopgate/pwa-common-commerce/market/helpers/showReturnPolicy';
import {
  NAV_MENU_STORE_INFORMATION,
  NAV_MENU_STORE_INFORMATION_AFTER,
  NAV_MENU_STORE_INFORMATION_BEFORE,
  NAV_MENU_STORE_INFORMATION_MORE,
  NAV_MENU_STORE_INFORMATION_MORE_AFTER,
  NAV_MENU_STORE_INFORMATION_MORE_BEFORE,
  NAV_MENU_STORE_INFORMATION_ABOUT,
  NAV_MENU_STORE_INFORMATION_ABOUT_AFTER,
  NAV_MENU_STORE_INFORMATION_ABOUT_BEFORE,
} from '@shopgate/pwa-common/constants/Portals';
import NavDrawerSection from '../Section';
import ShippingButton from './components/ShippingButton';
import PaymentButton from './components/PaymentButton';
import TermsButton from './components/TermsButton';
import PrivacyButton from './components/PrivacyButton';
import ReturnsButton from './components/ReturnsButton';
import ImprintButton from './components/ImprintButton';
import portalProps from '../../portalProps';

/**
 * @returns {JSX}
 */
const StoreInfo = () => (
  <Fragment>
    <Portal name={NAV_MENU_STORE_INFORMATION_BEFORE} props={portalProps} />
    <Portal name={NAV_MENU_STORE_INFORMATION} props={portalProps}>
      <Portal name={NAV_MENU_STORE_INFORMATION_MORE_BEFORE} props={portalProps} />
      <Portal name={NAV_MENU_STORE_INFORMATION_MORE} props={portalProps}>
        <NavDrawerSection title="navigation.menuSubHeader.more">
          <ShippingButton />
          <PaymentButton />
        </NavDrawerSection>
      </Portal>
      <Portal name={NAV_MENU_STORE_INFORMATION_MORE_AFTER} props={portalProps} />

      <Portal name={NAV_MENU_STORE_INFORMATION_ABOUT_BEFORE} props={portalProps} />
      <Portal name={NAV_MENU_STORE_INFORMATION_ABOUT} props={portalProps}>
        <NavDrawerSection title="navigation.menuSubHeader.about">
          <TermsButton />
          <PrivacyButton />
          {showReturnPolicy && <ReturnsButton />}
          <ImprintButton />
        </NavDrawerSection>
      </Portal>
      <Portal name={NAV_MENU_STORE_INFORMATION_ABOUT_AFTER} props={portalProps} />
    </Portal>
    <Portal name={NAV_MENU_STORE_INFORMATION_AFTER} props={portalProps} />
  </Fragment>
);

export default StoreInfo;
