import { connect } from 'react-redux';
import { getShopSettings, getConfigFetching } from '@shopgate/engage/core/config';
import { getPreferredLocationAddress } from '@shopgate/engage/locations/selectors';
import { submitRegistration } from './RegistrationProvider.actions';

/**
 * @returns {Function}
 */
function makeMapStateToProps() {
  /**
   * @param {Object} state The application state.
   * @returns {Object}
   */
  return state => ({
    isDataReady: !getConfigFetching(state),
    shopSettings: getShopSettings(state),
    userLocation: getPreferredLocationAddress(state),
  });
}

const mapDispatchToProps = {
  submitRegistration,
};

export default connect(makeMapStateToProps, mapDispatchToProps);
