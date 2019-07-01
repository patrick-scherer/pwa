import { useRoute } from './useRoute';
import { getPageConfig } from '../config/getPageConfig';

/**
 * Retrieves the configuration for the current page. The returned page config is pure and the page
 * settings are not inherited!
 * @returns {Object}
 */
export function usePageConfig() {
  const { pattern: pagePattern } = useRoute();
  return getPageConfig(pagePattern);
}
