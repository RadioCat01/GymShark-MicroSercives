/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductResponse } from '../../models/product-response';

export interface FindUnisex$Params {
}

export function findUnisex(http: HttpClient, rootUrl: string, params?: FindUnisex$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
  const rb = new RequestBuilder(rootUrl, findUnisex.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProductResponse>>;
    })
  );
}

findUnisex.PATH = '/api/v1/viewProducts/Unisex';
