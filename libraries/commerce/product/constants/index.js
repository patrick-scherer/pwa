export const ITEM_PATH = '/item';
export const ITEM_PATTERN = `${ITEM_PATH}/:productId`;
export const ITEM_GALLERY_PATTERN = `${ITEM_PATH}/:productId/gallery/:slide`;
export const ITEM_REVIEWS_PATTERN = `${ITEM_PATH}/:productId/reviews`;
export const ITEM_WRITE_REVIEW_PATTERN = `${ITEM_PATH}/:productId/write_review`;

export const PRODUCT_LIFETIME = 3600000; // 1 hour in milliseconds

// PRODUCT
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const RECEIVE_PRODUCT_CACHED = 'RECEIVE_PRODUCT_CACHED';
export const ERROR_PRODUCT = 'ERROR_PRODUCT';
// PRODUCTS
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ERROR_PRODUCTS = 'ERROR_PRODUCTS';
// PRODUCT VARIANTS
export const REQUEST_PRODUCT_VARIANTS = 'REQUEST_PRODUCT_VARIANTS';
export const RECEIVE_PRODUCT_VARIANTS = 'RECEIVE_PRODUCT_VARIANTS';
export const ERROR_PRODUCT_VARIANTS = 'ERROR_PRODUCT_VARIANTS';
// PRODUCT OPTIONS
export const REQUEST_PRODUCT_OPTIONS = 'REQUEST_PRODUCT_OPTIONS';
export const RECEIVE_PRODUCT_OPTIONS = 'RECEIVE_PRODUCT_OPTIONS';
export const ERROR_PRODUCT_OPTIONS = 'ERROR_PRODUCT_OPTIONS';
// PRODUCT DESCRIPTION
export const REQUEST_PRODUCT_DESCRIPTION = 'REQUEST_PRODUCT_DESCRIPTION';
export const RECEIVE_PRODUCT_DESCRIPTION = 'RECEIVE_PRODUCT_DESCRIPTION';
export const ERROR_PRODUCT_DESCRIPTION = 'ERROR_PRODUCT_DESCRIPTION';
// PRODUCT PROPERTIES
export const REQUEST_PRODUCT_PROPERTIES = 'REQUEST_PRODUCT_PROPERTIES';
export const RECEIVE_PRODUCT_PROPERTIES = 'RECEIVE_PRODUCT_PROPERTIES';
export const ERROR_PRODUCT_PROPERTIES = 'ERROR_PRODUCT_PROPERTIES';
// PRODUCT SHIPPING
export const REQUEST_PRODUCT_SHIPPING = 'REQUEST_PRODUCT_SHIPPING';
export const RECEIVE_PRODUCT_SHIPPING = 'RECEIVE_PRODUCT_SHIPPING';
export const ERROR_PRODUCT_SHIPPING = 'ERROR_PRODUCT_SHIPPING';
// PRODUCT IMAGES
export const REQUEST_PRODUCT_IMAGES = 'REQUEST_PRODUCT_IMAGES';
export const RECEIVE_PRODUCT_IMAGES = 'RECEIVE_PRODUCT_IMAGES';
export const ERROR_PRODUCT_IMAGES = 'ERROR_PRODUCT_IMAGES';
// PRODUCT MEDIA
export const REQUEST_PRODUCT_MEDIA = 'REQUEST_PRODUCT_MEDIA';
export const RECEIVE_PRODUCT_MEDIA = 'RECEIVE_PRODUCT_MEDIA';
export const ERROR_PRODUCT_MEDIA = 'ERROR_PRODUCT_MEDIA';
// CURRENT PRODUCT
export const RESET_CURRENT_PRODUCT = 'RESET_CURRENT_PRODUCT';

export const EXPIRE_PRODUCT_BY_ID = 'EXPIRE_PRODUCT_BY_ID';
export const SET_PRODUCT_ID = 'SET_PRODUCT_ID';
export const SET_PRODUCT_VARIANT_ID = 'SET_PRODUCT_VARIANT_ID';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const SET_PRODUCT_OPTION = 'SET_PRODUCT_OPTION';

// PRODUCT AVAILABILITY STATES
export const AVAILABILITY_STATE_OK = 'ok';
export const AVAILABILITY_STATE_WARNING = 'warning';
export const AVAILABILITY_STATE_ALERT = 'alert';

export const OPTION_TYPE_SELECT = 'select';
export const OPTION_TYPE_TEXT = 'text';

export const PROPERTIES_FILTER_WHITELIST = 'whitelist';
export const PROPERTIES_FILTER_BLACKLIST = 'blacklist';

// PRODUCT RELATIONS
export const REQUEST_PRODUCT_RELATIONS = 'REQUEST_PRODUCT_RELATIONS';
export const RECEIVE_PRODUCT_RELATIONS = 'RECEIVE_PRODUCT_RELATIONS';
export const ERROR_PRODUCT_RELATIONS = 'ERROR_PRODUCT_RELATIONS';
export const PRODUCT_RELATIONS_DEFAULT_LIMIT = 20;

// PRODUCT RELATIONS TYPES
export const PRODUCT_RELATIONS_TYPE_CROSS_SELLING = 'crossSelling';
export const PRODUCT_RELATIONS_TYPE_UPSELLING = 'upselling';
export const PRODUCT_RELATIONS_TYPE_BONUS = 'bonus';
export const PRODUCT_RELATIONS_TYPE_BOUGHT_WITH = 'boughtWith';
export const PRODUCT_RELATIONS_TYPE_CUSTOM = 'custom';

// PRODUCT METADATA
export const UPDATE_METADATA = 'UPDATE_METADATA';

// COMPONENT LOCATIONS (price, title, etc)
export const LOCATION_CATEGORY = 'plp'; // category, product list
export const LOCATION_PRODUCT = 'pdp'; // product page
export const LOCATION_GRID = 'grid'; // other grids, sliders

// MEDIA TYPES
export const MEDIA_TYPE_IMAGE = 'image';
export const MEDIA_TYPE_VIDEO = 'video';
