import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../Services/Product/models';
import { CartService } from '../../Services/CartService/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {


  @Input() product!: ProductResponse;

  price:number = 0;
  name:string = '';
  
  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.price = this.product.price;
      this.name = this.product.naame;
    }
  }


  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  getImageUrlBg(): string {
    return `url('data:image/jpeg;base64,${this.product.imagePath}')`;
  }


}
