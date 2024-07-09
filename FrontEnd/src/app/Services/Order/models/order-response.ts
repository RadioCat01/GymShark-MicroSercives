/* tslint:disable */
/* eslint-disable */
export interface OrderResponse {
  amount?: number;
  customerId?: string;
  id?: number;
  paymentMethod?: 'PAYPAL' | 'VISA' | 'CREDIT_CARD' | 'MASTER_CARD' | 'BITCOIN';
  reference?: string;
}
