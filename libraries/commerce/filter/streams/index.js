import { ACTION_PUSH, ACTION_POP } from '@virtuous/conductor/constants';
import { routeWillEnter$, routeWillLeave$ } from '@shopgate/pwa-common/streams/router';
import { CATEGORY_PATH } from '../../category/constants';
import { SEARCH_PATH } from '../../search/constants';
import { FILTER_PATH } from '../constants';

export const filterWillEnter$ = routeWillEnter$
  .filter(({ action }) => action.route.pattern === `${CATEGORY_PATH}/:categoryId${FILTER_PATH}`);

export const filterWillLeave$ = routeWillLeave$
  .filter(({ action }) => action.route.pattern === `${CATEGORY_PATH}/:categoryId${FILTER_PATH}`);

export const filterableRoutesWillEnter$ = routeWillEnter$
  .filter(({ action }) => (
    action.historyAction === ACTION_PUSH
    && (
      action.route.pattern === `${CATEGORY_PATH}/:categoryId`
      || action.route.pattern === SEARCH_PATH
    )
  ));

export const filterableRoutesWillReenter$ = routeWillEnter$
  .filter(({ action }) => (
    action.historyAction === ACTION_POP
    && (
      action.route.pattern === `${CATEGORY_PATH}/:categoryId`
      || action.route.pattern === SEARCH_PATH
    )
  ));

export const filterableRoutesWillLeave$ = routeWillLeave$
  .filter(({ action }) => (
    action.historyAction === ACTION_POP
    && (
      action.route.pattern === `${CATEGORY_PATH}/:categoryId`
      || action.route.pattern === SEARCH_PATH
    )
  ));

export const attributeWillEnter$ = routeWillEnter$
  .filter(({ action }) => action.route.pattern === `${CATEGORY_PATH}/:categoryId${FILTER_PATH}/:attribute`);
