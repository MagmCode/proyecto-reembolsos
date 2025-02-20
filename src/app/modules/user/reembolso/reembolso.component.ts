import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Factura {
  nroFactura: string;
  nroControl: string;
  fechaFactura: Date;
  concepto: string;
  monto: number;
  documentos: { nombre: string; url: string }[];
  estado: string;
}

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss']
})
export class ReembolsoComponent implements OnInit {
  displayedColumns: string[] = ['nroFactura', 'nroControl', 'fechaFactura', 'concepto', 'monto', 'documentos', 'estado', 'acciones'];
  facturaDataSource = new MatTableDataSource<Factura>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('addFacturaDialog') addFacturaDialog!: TemplateRef<any>;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  selectedFiles: { [key: string]: File } = {};

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Inicializa los formularios
    this.firstFormGroup = this._formBuilder.group({
      nroFactura: ['', Validators.required],
      nroControl: ['', Validators.required],
      fechaFactura: ['', Validators.required],
      concepto: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      informeAmplio: [''],
      informeEstudio: [''],
      docIdentificacion: ['']
    });

    // Carga datos de ejemplo
    this.facturaDataSource.data = this.getDatosDeEjemplo();
  }

  ngAfterViewInit(): void {
    this.facturaDataSource.paginator = this.paginator;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  addRow(): void {
    const dialogRef = this.dialog.open(this.addFacturaDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedFiles = {}; // Limpia los archivos seleccionados al cerrar el diálogo
    });
  }

  onFileSelected(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
  }

  guardar(): void {
    if (this.firstFormGroup.invalid) {
      this.mostrarNotificacion('Por favor, complete todos los campos requeridos.');
      return;
    }

    const facturaData = this.firstFormGroup.value;
    const documentos = Object.keys(this.selectedFiles).map(key => ({
      nombre: this.selectedFiles[key].name,
      url: URL.createObjectURL(this.selectedFiles[key])
    }));

    const nuevaFactura: Factura = {
      ...facturaData,
      documentos,
      estado: 'En revisión'
    };

    this.facturaDataSource.data = [...this.facturaDataSource.data, nuevaFactura];
    this.dialog.closeAll();
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.selectedFiles = {};
    this.mostrarNotificacion('Solicitud agregada correctamente.');
  }

  getFileName(field: string): string {
    const file = this.selectedFiles[field];
    return file ? file.name : '';
  }

  deleteRow(element: Factura): void {
    this.facturaDataSource.data = this.facturaDataSource.data.filter(e => e !== element);
    this.mostrarNotificacion('Solicitud eliminada.');
  }

  descargarDocumentos(element: Factura): void {
    element.documentos.forEach(doc => {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.nombre;
      link.click();
    });
  }

  verDetalles(element: Factura): void {
    console.log('Detalles de la factura:', element);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.facturaDataSource.filter = filterValue.trim().toLowerCase();
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Aprobado': return 'estado-aprobado';
      case 'Rechazado': return 'estado-rechazado';
      case 'En revisión': return 'estado-revision';
      default: return '';
    }
  }

  get totalSolicitudes(): number {
    return this.facturaDataSource.data.length;
  }

  get aprobadas(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'Aprobado').length;
  }

  get enRevision(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'En revisión').length;
  }

  get rechazadas(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'Rechazado').length;
  }

  mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  getDatosDeEjemplo(): Factura[] {
    return [
      {
        nroFactura: '001',
        nroControl: 'A1',
        fechaFactura: new Date('2023-10-01'),
        concepto: 'Consulta',
        monto: 100,
        documentos: [
          { nombre: 'InformeAmplio.pdf', url: 'ruta/al/archivo' },
          { nombre: 'Identificacion.jpg', url: 'ruta/al/archivo' }
        ],
        estado: 'Aprobado'
      },
      {
        nroFactura: '002',
        nroControl: 'A2',
        fechaFactura: new Date('2023-10-02'),
        concepto: 'Examen',
        monto: 200,
        documentos: [
          { nombre: 'InformeEstudio.pdf', url: 'ruta/al/archivo' }
        ],
        estado: 'En revisión'
      }
    ];
  }
}