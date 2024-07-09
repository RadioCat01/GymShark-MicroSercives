/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderResponse } from '../../models/order-response';

export interface FindById$Params {
  'order-id': number;
}

export function findById(http: HttpClient, rootUrl: string, params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
  const rb = new RequestBuilder(rootUrl, findById.PATH, 'get');
  if (params) {
    rb.path('order-id', params['order-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderResponse>;
    })
  );
}

findById.PATH = '/api/v1/orders/{order-id}';
