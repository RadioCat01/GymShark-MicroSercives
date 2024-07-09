/* tslint:disable */
/* eslint-disable */
import { PurchaseRequest } from '../models/purchase-request';
export interface OrderRequest {
  amount?: number;
  houseNumber: string;
  id?: number;
  paymentMethod: 'PAYPAL' | 'VISA' | 'CREDIT_CARD' | 'MASTER_CARD' | 'BITCOIN';
  products: Array<PurchaseRequest>;
  reference?: string;
  street: string;
  zipCode: string;
}
