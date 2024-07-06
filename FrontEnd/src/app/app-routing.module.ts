import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Services/Guard/auth.guard';
import { LandingComponent } from './Pages/landing/landing.component';
import { CreateProductComponent } from './Pages/create-product/create-product.component';
import { FooterComponent } from './Components/footer/footer.component';


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
    path: 'footer',
    component : FooterComponent,
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
