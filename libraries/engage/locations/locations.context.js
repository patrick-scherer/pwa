// @flow
import * as React from 'react';
import { type Product } from '../product';
import {
  type Location,
  type ReservationFormValues,
  type SheetStage,
  type FulfillmentPath,
  type SheetOpenParams,
  type SheetCallbackFn,
} from './locations.types';
import { STAGE_SELECT_STORE } from './constants';
import { type ShopSettings } from '../core/config';

export type FulfillmentContextProps = {
  selectLocation: (location: Location) => void,
  changeFulfillment: (method: string, cartItem: { [string]: any }) => void,
  sendReservation: (values: ReservationFormValues) => Promise<void>,
  isStage: (stage: SheetStage) => boolean,
  handleOpen: (params: SheetOpenParams) => void,
  handleClose: SheetCallbackFn,
  location: Location | null, // current product location
  locations: Location[] | null,
  orderNumbers: string[] | null,
  baseProduct: Product | null,
  product: Product | null,
  userInput: ReservationFormValues | null,
  stage: SheetStage | null,
  title: string | null,
  fulfillmentPath: FulfillmentPath | null,
  fulfillmentMethods: string[] | null,
  enabledFulfillmentMethods: string[] | null,
  shopSettings: ShopSettings | null,
  isOpen: boolean,
  errors: string[] | null,
  meta?: { [string]: any },
}

export const FulfillmentContext = React.createContext<FulfillmentContextProps>({
  selectLocation() { },
  changeFulfillment() { },
  sendReservation() { return Promise.resolve(); },
  isStage() { return false; },
  handleOpen() { },
  handleClose() { },
  location: null,
  locations: [],
  orderNumbers: [],
  baseProduct: null,
  product: null,
  userInput: null,
  stage: STAGE_SELECT_STORE,
  title: null,
  fulfillmentPath: null,
  fulfillmentMethods: null,
  enabledFulfillmentMethods: null,
  shopSettings: null,
  isOpen: false,
  errors: null,
});
