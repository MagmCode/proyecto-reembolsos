import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartaaval-admin',
  templateUrl: './cartaaval-admin.component.html',
  styleUrls: ['./cartaaval-admin.component.scss']
})
export class CartaavalAdminComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'fecha_reporte', 'nro_siniestro', 'paciente', 'estatus', 'ver'];
  dataSource = new MatTableDataSource<CartaAval>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5; // Mostrar solo 5 filas por página
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Remueve espacios en blanco y aplica el filtro en minúsculas
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalle(id: number): void {
    this.router.navigate(['admin/carta-aval/detalle', id]);

  }

}

export interface CartaAval {
  id: number;
  fecha_reporte: string;
  nro_siniestro: string;
  paciente: string;
  estatus: string;
}

const ELEMENT_DATA: CartaAval[] = [
  { id: 1, fecha_reporte: '2023-10-01', nro_siniestro: 'SN-001', paciente: 'Juan Perez', estatus: 'Pendiente' },
  { id: 2, fecha_reporte: '2023-10-02', nro_siniestro: 'SN-002', paciente: 'Maria Gomez', estatus: 'Aprobado' },
  { id: 3, fecha_reporte: '2023-10-03', nro_siniestro: 'SN-003', paciente: 'Carlos Lopez', estatus: 'Rechazado' },
  { id: 4, fecha_reporte: '2023-10-04', nro_siniestro: 'SN-004', paciente: 'Ana Rodriguez', estatus: 'Pendiente' },
  { id: 5, fecha_reporte: '2023-10-05', nro_siniestro: 'SN-005', paciente: 'Luis Martinez', estatus: 'Aprobado' },
  { id: 6, fecha_reporte: '2023-10-06', nro_siniestro: 'SN-006', paciente: 'Sofia Hernandez', estatus: 'Pendiente' },
  // Agrega más datos según sea necesario
];