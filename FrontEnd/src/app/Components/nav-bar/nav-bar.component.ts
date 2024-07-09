import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { CartService } from '../../Services/CartService/cart.service';
import { ProductResponse } from '../../Services/Product/models';
import { KeycloakService } from '../../Services/KeyCloak/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  cartItemCount: number = 0;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private keycloak: KeycloakService
  
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: ProductResponse[]) => {
      this.cartItemCount = items.length;
    });
  }

  logout():void {
    this.keycloak.logout();
  }

  openDialog() {
    this.dialog.open(CreateOrderComponent,{
      width:'600px',
      height: '500px'
    });
  }

}
