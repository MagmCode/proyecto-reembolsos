import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ReembolsoService, Reembolso } from 'src/app/services/reembolsos.service'; 

@Component({
  selector: 'app-reembolso-admin',
  templateUrl: './reembolso-admin.component.html',
  styleUrls: ['./reembolso-admin.component.scss']
})
export class ReembolsoAdminComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'fecha_reporte', 'nro_siniestro', 'paciente', 'estatus', 'ver'];
  dataSource = new MatTableDataSource<Reembolso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private reembolsoService: ReembolsoService
  ) { }

  ngOnInit(): void {
    // Obtener los datos de reembolsos desde el servicio
    this.reembolsoService.getReembolsos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5; // Mostrar solo 5 filas por página
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalle(id: number): void {
    this.router.navigate(['admin/reembolso/detalle', id]);
  }
}
