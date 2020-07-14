import { mockedProducts } from '@shopgate/pwa-common-commerce/product/mock';
import { getPreferredLocation, getExternalCustomerNumberForOrder } from '../../selectors';
import createOrder from '../createOrder';

jest.mock('@shopgate/engage/core');
jest.mock('@shopgate/engage/cart');
jest.mock('@shopgate/engage/product');
jest.mock('@shopgate/pwa-common/helpers/config');
jest.mock('../../selectors', () => ({
  getPreferredLocation: jest.fn(),
  getExternalCustomerNumberForOrder: jest.fn(),
}));

describe('libraries > engage > locations > helpers > createOrder', () => {
  const getState = jest.fn();

  const formValues = {
    firstName: 'firstName',
    lastName: 'lastName',
    cellPhone: 'cellPhone',
    email: 'email',
    firstName2: 'firstName2',
    lastName2: 'lastName2',
    cellPhone2: 'cellPhone2',
    email2: 'email2',
  };

  it('should create order for single product', () => {
    getPreferredLocation.mockReturnValue({
      code: 'LOCATION_CODE',
    });
    getExternalCustomerNumberForOrder.mockReturnValueOnce('123456');
    expect(createOrder(formValues, mockedProducts.products[0], getState)).toMatchSnapshot();
  });

  it('should create order for cart items', () => {
    getExternalCustomerNumberForOrder.mockReturnValueOnce('123456');
    expect(createOrder(formValues, null, getState)).toMatchSnapshot();
  });
});
