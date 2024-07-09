import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/Guard/auth.guard';
import { LandingComponent } from './Pages/landing/landing.component';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { CreateOrderComponent } from './Components/create-order/create-order.component';


const routes: Routes = [
  {
    path: '', redirectTo:'/landing', pathMatch:'full'
  },
  {
    path:"landing",
    component : LandingComponent,
  },
  {
    path: 'createProduct',
    component : CreateProductComponent,
    canActivate : [authGuard]
  },
  {
    path: 'createOrder',
    component : CreateOrderComponent,
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
