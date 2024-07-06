import { Component, Input } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../Services/Product/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {


  @Input() product!: ProductResponse;


  getImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  getImageUrlBg(): string {
    return `url('data:image/jpeg;base64,${this.product.imagePath}')`;
  }


}
