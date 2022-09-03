import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ProductsApiService } from '../products-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;

  constructor(
    private service: ProductsApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listenerParams();
  }

  listenerParams() {
    this.activatedRoute.params.pipe().subscribe(
      (params: any) => {
        if (Object(params).id) {
          this.getProductById(params.id);
        }
      }
    );
  }

  getProductById(id: any) {
    this.service.getProductById(id).subscribe(
      (res: any) => {
        this.product = res;
        this.product.installments = this.product.price / 10.00;
      })
  }
}
