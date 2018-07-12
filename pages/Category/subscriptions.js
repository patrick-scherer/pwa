import setTitle from '@shopgate/pwa-common/actions/view/setTitle';
import fetchCategory from '@shopgate/pwa-common-commerce/category/actions/fetchCategory';
import { getCategoryName } from '@shopgate/pwa-common-commerce/category/selectors';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import { categoryWillEnter$, receivedVisibleCategory$ } from './streams';
import getCategory from '@shopgate/pwa-common-commerce/category/actions/getCategory';
import { getCurrentCategoryId } from '@shopgate/pwa-common-commerce/category/selectors';
import {
  categoryRouteDidEnter$,
  categoryError$,
} from '@shopgate/pwa-common-commerce/category/streams';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';

/**
 * Filter subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function category(subscribe) {
  subscribe(categoryWillEnter$, ({ dispatch, action, getState }) => {
    let { title } = action.route.state;

    dispatch(fetchCategory(hex2bin(action.route.params.categoryId)));

    // If a title didn't come in then try to lookup the category and grab its name.
    if (!title) {
      title = getCategoryName(getState());
    }

    if (title) {
      dispatch(setTitle(title));
    }
  });

  subscribe(receivedVisibleCategory$, ({ dispatch, action }) => {
    dispatch(setTitle(action.categoryData.name));
  });

  /**
   * Gets triggered on pipeline category error.
   */
  subscribe(categoryError$, ({ action, dispatch }) => {
    const { errorCode } = action;
    let message = 'modal.body_error';

    if (errorCode === 'ENOTFOUND') {
      message = 'category.error.not_found';
    }

    dispatch(showModal({
      confirm: 'modal.ok',
      dismiss: null,
      message,
      title: 'category.error.title',
    }));
    dispatch(goBackHistory(1));
  });
}
