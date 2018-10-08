import { ACTION_RESET } from '@virtuous/conductor/constants';
import { navigate } from '../../action-creators/router';

/**
 * @return {Function} The dispatched action.
 */
export function historyReset() {
  return (dispatch) => {
    dispatch(navigate({ action: ACTION_RESET }));
  };
}