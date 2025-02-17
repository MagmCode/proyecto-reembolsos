import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; 

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
export class ReembolsoComponent implements OnInit {
  displayedColumns: string[] = ['nroFactura', 'nroControl', 'fechaFactura', 'concepto', 'monto', 'comprobante', 'actions'];
  facturaDataSource = new MatTableDataSource<Factura>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Simula la carga de datos (puedes reemplazar esto con una llamada a tu API)
    this.facturaDataSource.data = this.getDatosDeEjemplo();
  }

  ngAfterViewInit(): void {
    // Vincula el paginador con la fuente de datos
    this.facturaDataSource.paginator = this.paginator;
  }

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

  // Función de ejemplo para obtener datos
  getDatosDeEjemplo(): Factura[] {
    return [
      { nroFactura: '001', nroControl: 'A1', fechaFactura: new Date('2023-10-01'), concepto: 'Consulta', monto: 100, comprobante: 'C001' },
      { nroFactura: '002', nroControl: 'A2', fechaFactura: new Date('2023-10-02'), concepto: 'Examen', monto: 200, comprobante: 'C002' },
      { nroFactura: '003', nroControl: 'A3', fechaFactura: new Date('2023-10-03'), concepto: 'Medicina', monto: 50, comprobante: 'C003' },
      { nroFactura: '004', nroControl: 'A4', fechaFactura: new Date('2023-10-04'), concepto: 'Cirugía', monto: 500, comprobante: 'C004' },
      { nroFactura: '005', nroControl: 'A5', fechaFactura: new Date('2023-10-05'), concepto: 'Terapia', monto: 80, comprobante: 'C005' },
      { nroFactura: '006', nroControl: 'A6', fechaFactura: new Date('2023-10-06'), concepto: 'Consulta', monto: 100, comprobante: 'C006' },
      { nroFactura: '007', nroControl: 'A7', fechaFactura: new Date('2023-10-07'), concepto: 'Examen', monto: 200, comprobante: 'C007' },
      { nroFactura: '008', nroControl: 'A8', fechaFactura: new Date('2023-10-08'), concepto: 'Medicina', monto: 50, comprobante: 'C008' },
      { nroFactura: '009', nroControl: 'A9', fechaFactura: new Date('2023-10-09'), concepto: 'Cirugía', monto: 500, comprobante: 'C009' },
      { nroFactura: '010', nroControl: 'A10', fechaFactura: new Date('2023-10-10'), concepto: 'Terapia', monto: 80, comprobante: 'C010' },
    ];
  }
}