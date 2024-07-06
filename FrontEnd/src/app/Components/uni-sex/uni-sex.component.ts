import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../Services/Product/models';
import { ProductviewControllerService } from '../../Services/Product/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uni-sex',
  templateUrl: './uni-sex.component.html',
  styleUrl: './uni-sex.component.scss'
})
export class UniSexComponent implements OnInit{

  productResponse: ProductResponse[] = [];

  constructor(
    private viewProducts: ProductviewControllerService,
    private router : Router
    ){}

  ngOnInit(): void {
    this.viewProducts.findUnisex().subscribe({
      next: (products) => this.productResponse = products
    });
  }

}
