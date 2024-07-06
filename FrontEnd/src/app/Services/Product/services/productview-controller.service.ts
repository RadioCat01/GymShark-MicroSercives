/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll } from '../fn/productview-controller/find-all';
import { FindAll$Params } from '../fn/productview-controller/find-all';
import { findById } from '../fn/productview-controller/find-by-id';
import { FindById$Params } from '../fn/productview-controller/find-by-id';
import { findMen } from '../fn/productview-controller/find-men';
import { FindMen$Params } from '../fn/productview-controller/find-men';
import { findUnisex } from '../fn/productview-controller/find-unisex';
import { FindUnisex$Params } from '../fn/productview-controller/find-unisex';
import { findWomen } from '../fn/productview-controller/find-women';
import { FindWomen$Params } from '../fn/productview-controller/find-women';
import { ProductResponse } from '../models/product-response';

@Injectable({ providedIn: 'root' })
export class ProductviewControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/api/v1/viewProducts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<ProductResponse>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>): Array<ProductResponse> => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/api/v1/viewProducts/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `findWomen()` */
  static readonly FindWomenPath = '/api/v1/viewProducts/Women';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWomen()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWomen$Response(params?: FindWomen$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
    return findWomen(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findWomen$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWomen(params?: FindWomen$Params, context?: HttpContext): Observable<Array<ProductResponse>> {
    return this.findWomen$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>): Array<ProductResponse> => r.body)
    );
  }

  /** Path part for operation `findUnisex()` */
  static readonly FindUnisexPath = '/api/v1/viewProducts/Unisex';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUnisex()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnisex$Response(params?: FindUnisex$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
    return findUnisex(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUnisex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnisex(params?: FindUnisex$Params, context?: HttpContext): Observable<Array<ProductResponse>> {
    return this.findUnisex$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>): Array<ProductResponse> => r.body)
    );
  }

  /** Path part for operation `findMen()` */
  static readonly FindMenPath = '/api/v1/viewProducts/Men';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMen()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMen$Response(params?: FindMen$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
    return findMen(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMen$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMen(params?: FindMen$Params, context?: HttpContext): Observable<Array<ProductResponse>> {
    return this.findMen$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>): Array<ProductResponse> => r.body)
    );
  }

}
