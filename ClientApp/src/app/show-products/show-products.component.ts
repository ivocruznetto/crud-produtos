import { ProductsApiService } from './../products-api.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';


@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  listProducts!: any;
  listProductsScreen!: any;

  constructor(
    private service: ProductsApiService,
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  modalTitle: string = '';
  activateAddEditProductComponent: boolean = false;
  product: any;

  getProductsList() {
    this.service.getProductsList().subscribe(
      (res: any) => {
        this.listProducts = this.listProductsScreen = res;
      }
    );
  }

  modalAdd() {
    this.product = {
      id: 0,
      productName: null,
      productDescription: null,
      imageUrl: null,
      status: null,
      stock: null,
      price: null
    }
    this.modalTitle = "Novo Produto";
    this.activateAddEditProductComponent = true;
  }

  modalEdit(item: any) {
    this.product = item;
    this.modalTitle = "Alteração";
    this.activateAddEditProductComponent = true;
  }

  delete(id: number) {
    if (confirm(`Tem certeza que deseja excluir?`)) {
      this.service.deleteProducts(id).subscribe(() => {
        this.listProducts = this.getProductsList();
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }

        setTimeout(() => {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 3000);
      }, err =>
        alert(`Erro: ${err} - Tente novamente`)
      )
    }
  }

  alterStatus(product:any) {
    product.status = !product.status;
    this.service.updateProducts(product.id, product).subscribe((res) => {
      }, err =>
        alert(`Erro: ${err} - Tente novamente`)
    )
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.listProducts = this.getProductsList();
  }
}
