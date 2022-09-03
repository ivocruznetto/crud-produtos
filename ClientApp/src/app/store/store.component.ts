import { Component, OnInit } from '@angular/core';
import { ProductsApiService } from '../products-api.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  listProducts!: any;

  constructor(
    private service: ProductsApiService
  ) { }

  ngOnInit(): void {
    this.getProductByStatus();
  }

  getProductByStatus() {
    var status = true;
    this.service.getProductByStatus(status).subscribe(
      (res: any) => {
        this.listProducts = res;
        this.listProducts.map((x: any) => x.installments = x.price / 10.00);
      }
    );
  }

}
