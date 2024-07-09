/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createOrder } from '../fn/order-controller/create-order';
import { CreateOrder$Params } from '../fn/order-controller/create-order';
import { findAll } from '../fn/order-controller/find-all';
import { FindAll$Params } from '../fn/order-controller/find-all';
import { findById } from '../fn/order-controller/find-by-id';
import { FindById$Params } from '../fn/order-controller/find-by-id';
import { OrderResponse } from '../models/order-response';

@Injectable({ providedIn: 'root' })
export class OrderControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/api/v1/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderResponse>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<OrderResponse>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderResponse>>): Array<OrderResponse> => r.body)
    );
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/api/v1/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder$Response(params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder(params: CreateOrder$Params, context?: HttpContext): Observable<string> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/api/v1/orders/{order-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

}
