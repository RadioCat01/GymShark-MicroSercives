import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../Services/Product/models';
import { ProductControllerService, ProductviewControllerService } from '../../Services/Product/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  
  public id:number = 1;

  constructor(
     private viewProductService : ProductviewControllerService,
     private product: ProductControllerService
  ){}

  ngOnInit(): void {
    this.findAllProducts();
  }
  

  private findAllProducts() {
    this.viewProductService.findAll().subscribe({
      next: (products: Array<ProductResponse>) =>{
        console.log(products)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });  
  }
}
