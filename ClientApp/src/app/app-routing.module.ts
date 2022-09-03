import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: 'vitrine',
    component: StoreComponent,
    pathMatch: 'full'
  },
  {
    path: 'vitrine/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ProductsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
