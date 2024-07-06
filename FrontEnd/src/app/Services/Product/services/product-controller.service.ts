/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createProduct } from '../fn/product-controller/create-product';
import { CreateProduct$Params } from '../fn/product-controller/create-product';
import { ProductPurchaseResponse } from '../models/product-purchase-response';
import { purchaseProducts } from '../fn/product-controller/purchase-products';
import { PurchaseProducts$Params } from '../fn/product-controller/purchase-products';

@Injectable({ providedIn: 'root' })
export class ProductControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createProduct()` */
  static readonly CreateProductPath = '/api/v1/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createProduct$Response(params?: CreateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createProduct(params?: CreateProduct$Params, context?: HttpContext): Observable<number> {
    return this.createProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `purchaseProducts()` */
  static readonly PurchaseProductsPath = '/api/v1/products/purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `purchaseProducts()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  purchaseProducts$Response(params: PurchaseProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductPurchaseResponse>>> {
    return purchaseProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `purchaseProducts$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  purchaseProducts(params: PurchaseProducts$Params, context?: HttpContext): Observable<Array<ProductPurchaseResponse>> {
    return this.purchaseProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductPurchaseResponse>>): Array<ProductPurchaseResponse> => r.body)
    );
  }

}
