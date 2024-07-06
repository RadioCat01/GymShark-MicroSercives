import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './Services/KeyCloak/keycloak.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './Services/interceptor/http-token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/login/login.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CreateProductComponent } from './Pages/create-product/create-product.component';
import { MenComponent } from './Components/Men/men.component';
import { UniSexComponent } from './Components/uni-sex/uni-sex.component';
import { WomenComponent } from './Components/Women/women.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';


export function kcFactory(kcService: KeycloakService){
  return () =>kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    LandingComponent, 
    ProductCardComponent, 
    CreateProductComponent, 
    MenComponent, 
    UniSexComponent,
    WomenComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
     {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
     },
     provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
