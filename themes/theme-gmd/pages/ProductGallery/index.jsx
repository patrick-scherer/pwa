import React from 'react';
import PropTypes from 'prop-types';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import { RouteContext } from '@shopgate/pwa-common/context';
import { View } from '@shopgate/engage/components';
import ProductGalleryContent from './components/Content';

/**
 * @param {Object} props The component props.
 * @return {JSX}
 */
const ProductGallery = ({ productId, initialSlide }) => (
  <View>
    {!!productId && <ProductGalleryContent productId={productId} initialSlide={initialSlide} />}
  </View>
);

ProductGallery.propTypes = {
  initialSlide: PropTypes.number,
  productId: PropTypes.string,
};

ProductGallery.defaultProps = {
  initialSlide: 0,
  productId: null,
};

export default () => (
  <RouteContext.Consumer>
    {({ params }) => (
      <ProductGallery
        productId={hex2bin(params.productId) || null}
        initialSlide={parseInt(params.slide, 10) || 0}
      />
    )}
  </RouteContext.Consumer>
);

export { ProductGallery as UnwrappedProductGallery };
