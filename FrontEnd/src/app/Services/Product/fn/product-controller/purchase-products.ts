/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductPurchaseRequest } from '../../models/product-purchase-request';
import { ProductPurchaseResponse } from '../../models/product-purchase-response';

export interface PurchaseProducts$Params {
      body: Array<ProductPurchaseRequest>
}

export function purchaseProducts(http: HttpClient, rootUrl: string, params: PurchaseProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductPurchaseResponse>>> {
  const rb = new RequestBuilder(rootUrl, purchaseProducts.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProductPurchaseResponse>>;
    })
  );
}

purchaseProducts.PATH = '/api/v1/products/purchase';
