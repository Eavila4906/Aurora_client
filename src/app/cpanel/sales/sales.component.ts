import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/services/app.service';

interface Product {
  id: number;
  name: string;
  price: number;
  amout: number;
  subtotal?: number;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  @ViewChild('ModalRegisterSale') ModalRegisterSale?: ModalDirective;

  products: Product[] = [
    { id: 1, name: 'Atun', price: 1.30, amout: 0 },
    { id: 2, name: 'Cola', price: 1.50, amout: 0 },
  ];

  SelectedProducts: Product[] = [];
  totalPay: number = 0;
  subtotal: any;
  selectedQuantity: number = 1;
  amount: any;
  selectedProduct: Product | null = null;

  constructor (private AppService: AppService) {
    this.AppService.sidebar('sales-item');
  }

  ngOnInit() {

  }

  addToCart() {
    if (this.selectedProduct && this.selectedQuantity > 0) {
      const productInCart = this.SelectedProducts.find(p => p.id === this.selectedProduct?.id);

      if (productInCart) {
        productInCart.amout += this.selectedQuantity;
      } else {
        const productWithQuantity: Product = {
          ...this.selectedProduct,
          amout: this.selectedQuantity,
          subtotal: 0
        };
        this.SelectedProducts.push(productWithQuantity);
      }

      this.updateTotalPay();
      this.selectedProduct = null;
      this.selectedQuantity = 1;
    }
  }

  updateTotalPay() {
    this.totalPay = this.SelectedProducts.reduce((total, producto) => {
      this.subtotal = producto.price * producto.amout;
      producto.subtotal = this.subtotal;
      return total + this.subtotal;
    }, 0);
  }

  updateSubtotal(producto: Product, amount:any) {
    producto.amout = amount.value;
    producto.subtotal = producto.price * amount.value;
    this.updateTotalPay();
  }

  removeFromCart(product: Product) {
    const index = this.SelectedProducts.indexOf(product);
    if (index !== -1) {
      this.SelectedProducts.splice(index, 1);
      this.updateTotalPay();
    }
  }

  openModalRegisterSale() {
    this.ModalRegisterSale?.show();
  }

}
