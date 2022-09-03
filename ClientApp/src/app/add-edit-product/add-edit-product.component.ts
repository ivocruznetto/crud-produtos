import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ProductsApiService } from '../products-api.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  constructor(private service: ProductsApiService) { }

  listProduct!: Observable<any[]>;

  @Input() product: any;
  id: number = 0;
  productName: string = '';
  productDescription: string = '';
  imageUrl: any;
  status: boolean = true;
  stock: number = 0;
  price: number = 0;

  ngOnInit(): void {
    this.id = this.product.id;
    this.productName = this.product.productName;
    this.productDescription = this.product.productDescription;
    this.imageUrl = this.product.imageUrl;
    this.status = this.product.status;
    this.stock = this.product.stock;
    this.price = this.product.price;
  }

  handleUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  addProduct() {
    var product = {
      status: true,
      productName: this.productName,
      productDescription: this.productDescription,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl
    }
      this.service.addProducts(product).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('add-success-alert');
        if (showAddSuccess) {
          showAddSuccess.style.display = "block";
        }

        setTimeout(() => {
          if (showAddSuccess) {
            showAddSuccess.style.display = "none";
          }
        }, 3000);
      }, err =>
        alert('Erro: verifique se preencheu os campos corretamente')
      )

  }

  updateProduct() {
    var product = {
      id: this.id,
      status: this.status,
      productName: this.productName,
      productDescription: this.productDescription,
      stock: this.stock,
      price: this.price,
      imageUrl: this.imageUrl
    }
    var id: number = this.id;
    this.service.updateProducts(id, product).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(() => {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 3000);
    }, err =>
      alert('Erro: verifique se preencheu os campos corretamente')
    )

  }



}
