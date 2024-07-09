import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductResponse } from '../Product/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<ProductResponse[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  addToCart(product: ProductResponse) {
    const currentItems = this.cartItems.value;
    const updatedItems = [...currentItems, product]; 
    this.cartItems.next(updatedItems); 
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, product) => total + product.price, 0);
  }
  
}
