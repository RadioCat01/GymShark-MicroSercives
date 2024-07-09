import { Component, OnInit } from '@angular/core';
import { OrderRequest, PurchaseRequest } from '../../Services/Order/models';
import { CartService } from '../../Services/CartService/cart.service';
import { ProductResponse } from '../../Services/Product/models';
import { ReferenceService } from './reference.service';
import { Router, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderControllerService } from '../../Services/Order/services';
import { KeycloakService } from '../../Services/KeyCloak/keycloak.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit{

  Item: ProductResponse[] = [];

  cartItems: ProductResponse[] = [];
  totalPrice: number = 0;

  orderRequest: OrderRequest = {
    houseNumber: '',
    street: '',
    zipCode: '',
    amount: 0,
    reference:'',
    paymentMethod: 'PAYPAL',
    products: []
  };

  constructor(
    private orderService: OrderControllerService,
    private cart: CartService,
    private referenceService: ReferenceService,
    private keycloakservice: KeycloakService,
    private cartService: CartService,
    private router : Router,
    private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });

    this.cart.cartItems$.subscribe( cartItems => {
      this.orderRequest.amount = this.cart.getTotalPrice();
      this.orderRequest.products = cartItems.map(item => ({
        productId: item.id,
        quantity: 1
      }));},
    );
    }

    generateCustomReference():string{
      return '';
    }

  onSubmit() {
    this.orderRequest.reference = this.referenceService.generateCustomReference();
    this.orderService.createOrder({ body: this.orderRequest }).subscribe(
      (url:string) =>{
        window.location.href = url;
      }, error => {
      console.error('Error creating order:', error);
    });
  }
}
