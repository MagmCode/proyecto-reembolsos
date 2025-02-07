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
  displayedColumns: string[] = ['nroFactura', 'nroControl', 'fechaFactura', 'concepto', 'monto', 'comprobante'];
  facturaDataSource = new MatTableDataSource<Factura>([]);

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

  deleteRow() {
    this.facturaDataSource.data = this.facturaDataSource.data.slice(0, -1);
  }
}
