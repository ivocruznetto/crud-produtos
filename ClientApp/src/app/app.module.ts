import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsApiService } from './products-api.service';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    ShowProductsComponent,
    ProductsComponent,
    AddEditProductComponent,
    StoreComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ProductsApiService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
