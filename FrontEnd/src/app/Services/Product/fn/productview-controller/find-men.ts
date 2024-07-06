/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductResponse } from '../../models/product-response';

export interface FindMen$Params {
}

export function findMen(http: HttpClient, rootUrl: string, params?: FindMen$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
  const rb = new RequestBuilder(rootUrl, findMen.PATH, 'get');
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

findMen.PATH = '/api/v1/viewProducts/Men';
