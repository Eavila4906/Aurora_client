import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  @ViewChild('ModalChargeSetting') ModalChargeSetting?: ModalDirective;
  @ViewChild('ModalProofPayment') ModalProofPayment?: ModalDirective;
  @ViewChild('ModalChargePartial') ModalChargePartial?: ModalDirective;

  module: number = 8;
  permission_read: boolean = true;
  permission_create: boolean = true;
  permission_update: boolean = true;
  permission_delete: boolean = true;

  representatives: any[] = [
    { id: 1, representative: 'Jose Manuel Mendoza Garcia', date: '02-02-2024' }
  ];
  representative: string = '';
  date: string = '';

  frequency: any[] = [{ id: 1, frequency: 'Mensual' }, { id: 2, frequency: 'Quincenal' }, { id: 2, frequency: 'Semanal' }];
  cost: number = 0.00;

  //Search
  search: string = '';
  representativesFilter: any[] = [];

  valuePartialPayment: number = 0;
  resultPartialPayment: string = '';

  //Paginate
  currentPage = 1;
  recordPerPage = 5;

  constructor(
    private AppService: AppService, private AuthService: AuthService, private toastr: ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('charge-item');
  }

  ngOnInit(): void {

  }

  calculateRemainingBalance(amountPartial: number) {
    let cost = 25;
    if (amountPartial > cost) {
      this.resultPartialPayment = 'El monto a abonar no puede ser mayor que el costo del servicio.';
    } else if (amountPartial == cost) {
      this.resultPartialPayment = 'El monto a abonar es igual al costo del servicio, se recomienda hacer un cobro total.';
    } else {
      let value = cost - amountPartial;
      this.resultPartialPayment = 'El monto a abonar es de $'+ amountPartial + ', quedando una deuda de: $' +value.toString();
    }


  }

  openModalChargeSetting() {
    this.ModalChargeSetting?.show();
  }

  openModalChargePartial(id: number) {
    this.ModalChargePartial?.show();
  }

  charge(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '<strong>¿Desea confirmar el cobro?</strong>',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si, cobrar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.ModalProofPayment) {
          this.ModalProofPayment.config.ignoreBackdropClick = true;
          this.ModalProofPayment.show();
        }
      }
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  //Search
  Search() {
    this.representativesFilter = this.representatives.filter((rol: { id: string, rol: string, r_status: string }) => {
      let filter = true;
      if (this.search) {
        filter = rol.id.toString().toLowerCase().includes(this.search.toLowerCase()) ||
          rol.rol.toLowerCase().includes(this.search.toLowerCase()) ||
          rol.r_status.toLowerCase().startsWith(this.search.toLowerCase());
      }
      return filter;
    });
  }

  //Paginate
  countRangeRegister(): string {
    const startIndex = (this.currentPage - 1) * this.recordPerPage + 1;
    const endIndex = Math.min(startIndex + this.recordPerPage - 1, this.representativesFilter.length);
    let msg;
    endIndex === 0 ? msg = 'No hay registros.' : msg = `Mostrando registros del ${startIndex} al ${endIndex}`;
    return msg;
  }

}
