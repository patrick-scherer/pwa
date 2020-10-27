import { event, registerEvents } from '@shopgate/pwa-core';
import { willRegisterLinkEvents, didRegisterLinkEvents } from '../../action-creators/app';
import handlePushNotification from './handlePushNotification';
import handleDeepLink from './handleDeepLink';
import handleUniversalLink from './handleUniversalLink';

/**
 * Registers all link events.
 * @return {Function} A redux thunk.
 */
export default function registerLinkEvents() {
  return (dispatch) => {
    dispatch(willRegisterLinkEvents());

    registerEvents([
      'openPushNotification',
      'openDeepLink',
      'openUniversalLink',
    ]);

    event.addCallback('openPushNotification', payload => (
      dispatch(handlePushNotification(payload))
    ));

    event.addCallback('openDeepLink', (payload) => {
      // Payment links are handled using the new app event system.
      if (payload?.link.indexOf('//payment') !== -1) {
        return;
      }
      dispatch(handleDeepLink(payload));
    });

    event.addCallback('openUniversalLink', payload => (
      dispatch(handleUniversalLink(payload))
    ));

    dispatch(didRegisterLinkEvents());
  };
}
