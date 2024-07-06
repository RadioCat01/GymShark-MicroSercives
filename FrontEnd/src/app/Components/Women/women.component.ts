import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../Services/Product/models';
import { ProductviewControllerService } from '../../Services/Product/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrl: './women.component.scss'
})
export class WomenComponent implements OnInit{

  productResponse: ProductResponse[] = [];

  constructor(
    private viewProducts: ProductviewControllerService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.viewProducts.findWomen().subscribe({
      next: (products) => this.productResponse = products
    });
  }

}
