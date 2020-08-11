import React, { useMemo } from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { FormBuilder } from '@shopgate/engage/components';

import { StylePresets } from '@shopgate/engage/components/Form';
import generateFormConfig from './GuestRegistrationBillingFrom.config';
import Section from '../Checkout/CheckoutSection';
import { useGuestRegistration } from '../../hooks/common';

const { colors, variables } = themeConfig;

const styles = {
  root: css({
    padding: 16,
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
  }).toString(),
  form: css({
    ' .guestFormPickupPerson': {
      marginTop: variables.gap.small,
    },
    ' .guestFormPickupPerson .me': {
      marginRight: variables.gap.big,
    },
    ' .guestFormPickupPerson .label span': {
      color: colors.dark,
      fontSize: 20,
      fontWeight: 'bold',
    },
    ' .guestFormPickupPerson .radioGroup': {
      marginTop: variables.gap.small,
      flexDirection: 'row',
    },
    ...StylePresets.OUTLINED_FORM_FIELDS,
  }).toString(),
};

/**
 * PickupContactForm
 * @returns {JSX}
 */
const GuestRegistrationForm = () => {
  const {
    supportedCountries,
    userLocation,
    defaultBillingAddressState,
    formBillingValidationErrors,
    formBillingSetValues,
    requiredFields,
    orderReserveOnly,
  } = useGuestRegistration();

  const formConfig = React.useMemo(
    () => generateFormConfig(supportedCountries, userLocation, requiredFields, orderReserveOnly),
    [supportedCountries, userLocation, requiredFields, orderReserveOnly]
  );

  const handleUpdate = React.useCallback((values) => {
    formBillingSetValues(values);
  }, [formBillingSetValues]);

  const headline = useMemo(
    () =>
      (orderReserveOnly
        ? 'checkout.billing.headline_reserve'
        : 'checkout.billing.headline'),
    [orderReserveOnly]
  );

  return (
    <div className={styles.root}>
      <Section title={headline} hasForm>
        <FormBuilder
          className={styles.form}
          name="GuestForm"
          config={formConfig}
          defaults={defaultBillingAddressState}
          validationErrors={formBillingValidationErrors}
          handleUpdate={handleUpdate}
        />
      </Section>
    </div>
  );
};

export default GuestRegistrationForm;
