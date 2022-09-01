import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsApiService } from './products-api.service';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ShowProductsComponent,
    ProductsComponent,
    AddEditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ProductsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
