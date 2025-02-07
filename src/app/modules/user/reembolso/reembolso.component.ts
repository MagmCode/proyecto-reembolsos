import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface Factura {
  nroFactura: string;
  nroControl: string;
  fechaFactura: Date;
  concepto: string;
  monto: number;
  comprobante: string;
}



@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss']
})
export class ReembolsoComponent {
  displayedColumns: string[] = ['nroFactura', 'nroControl', 'fechaFactura', 'concepto', 'monto', 'comprobante', 'actions'];
  facturaDataSource = new MatTableDataSource<Factura>([]);


  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  addRow() {
    const newRow: Factura = {
      nroFactura: '',
      nroControl: '',
      fechaFactura: new Date(),
      concepto: '',
      monto: 0,
      comprobante: ''
    };
    this.facturaDataSource.data = [...this.facturaDataSource.data, newRow];
  }

  deleteRow(element: Factura) {
    this.facturaDataSource.data = this.facturaDataSource.data.filter(e => e !== element);
  }
}
