import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/Guard/auth.guard';
import { ProductsComponent } from './Pages/products/products.component';


const routes: Routes = [
  {
    path:"products",
    component:ProductsComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
