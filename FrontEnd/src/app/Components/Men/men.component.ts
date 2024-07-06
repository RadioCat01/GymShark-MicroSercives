import { Component } from '@angular/core';
import { ProductResponse } from '../../Services/Product/models';
import { ProductviewControllerService } from '../../Services/Product/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent {
  productResponse: ProductResponse[] = [];

  constructor(
    private viewProducts: ProductviewControllerService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.viewProducts.findMen().subscribe({
      next: (products) => this.productResponse = products
    });
  }
}
