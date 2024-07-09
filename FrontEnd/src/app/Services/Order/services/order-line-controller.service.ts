/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findByOrderId } from '../fn/order-line-controller/find-by-order-id';
import { FindByOrderId$Params } from '../fn/order-line-controller/find-by-order-id';
import { OrderLineResponse } from '../models/order-line-response';

@Injectable({ providedIn: 'root' })
export class OrderLineControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findByOrderId()` */
  static readonly FindByOrderIdPath = '/ap/v1/order-lines/order/{order-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByOrderId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByOrderId$Response(params: FindByOrderId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderLineResponse>>> {
    return findByOrderId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByOrderId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByOrderId(params: FindByOrderId$Params, context?: HttpContext): Observable<Array<OrderLineResponse>> {
    return this.findByOrderId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderLineResponse>>): Array<OrderLineResponse> => r.body)
    );
  }

}
