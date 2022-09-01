import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  readonly productsAPIUrl = 'https://localhost:7135/api';

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<any[]> {
    return this.http.get<any>(this.productsAPIUrl + '/products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.productsAPIUrl + `/products/${id}`);
  }

  addProducts(data: any) {
    return this.http.post(this.productsAPIUrl + '/products', data);
  }

  updateProducts(id: number | string, data: any) {
    return this.http.put(this.productsAPIUrl + `/products/${id}`, data);
  }

  deleteProducts(id: number | string) {
    return this.http.delete(this.productsAPIUrl + `/products/${id}`);
  }
}
