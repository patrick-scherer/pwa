// @ƒlow
import { type Location } from '../../locations.types';

export type OwnProps = {
  conditioner: {};
  productId: string;
}

export type StateProps = {
  fulfillmentMethods?: string[] | null;
  disabled?: boolean;
  location?: Location | null;
  userFulfillmentMethod: string | null;
}

export type DispatchProps = {
  storeFulfillmentMethods?: () => void;
}
