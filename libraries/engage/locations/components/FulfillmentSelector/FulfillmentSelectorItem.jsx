import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { I18n, RadioGroupItem as RadioItem } from '../../../components';
import * as styles from './FulfillmentSelector.style';

/**
 * Renders a RadioItem element to be used by the FulfillmentSelector component.
 * This component is meant to be rendered as child of a RadioGroup.
 * @param {Object} props All props required by the RadioGroupItem component to work.
 * @param {string} props.name The item to be rendered and identified by on selection.
 * @param {JSX} props.children The child components to be rendered besides the label.
 * @returns {JSX}
 */
const FulfillmentSelectorItem = ({ name, children, ...restProps }) => (
  <RadioItem
    name={name}
    label={(
      <div className={styles.radioGroupItemLabel}>
        <I18n.Text string={name} />
        {children}
      </div>
    )}
    {...restProps}
  />
);

FulfillmentSelectorItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

FulfillmentSelectorItem.defaultProps = {
  children: null,
};

export default memo(FulfillmentSelectorItem);
