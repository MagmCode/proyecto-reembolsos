import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Factura {
  nroFactura: string;
  nroControl: string;
  fechaFactura: string;
  concepto: string;
  monto: string;
  comprobante: string;
}

const ELEMENT_DATA: Factura[] = [
  {nroFactura: '', nroControl: '', fechaFactura: '', concepto: '', monto: '', comprobante: ''},
  // Add more rows as needed
];

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss']
})
export class ReembolsoComponent {
  displayedColumns: string[] = ['nroFactura', 'nroControl', 'fechaFactura', 'concepto', 'monto', 'comprobante', 'actions'];
  dataSource = ELEMENT_DATA;
}
