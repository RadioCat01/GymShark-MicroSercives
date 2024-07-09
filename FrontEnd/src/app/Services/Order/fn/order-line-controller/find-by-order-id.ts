/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderLineResponse } from '../../models/order-line-response';

export interface FindByOrderId$Params {
  'order-id': number;
}

export function findByOrderId(http: HttpClient, rootUrl: string, params: FindByOrderId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderLineResponse>>> {
  const rb = new RequestBuilder(rootUrl, findByOrderId.PATH, 'get');
  if (params) {
    rb.path('order-id', params['order-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderLineResponse>>;
    })
  );
}

findByOrderId.PATH = '/ap/v1/order-lines/order/{order-id}';
