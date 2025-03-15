export interface Reembolso {
    id: number; // ID del reembolso (número de factura)
    nroControl: string; // Número de control
    fechaFactura: string | Date; // Fecha de la factura (puede ser un string o Date)
    concepto: string; // Concepto del reembolso
    monto: number; // Monto del reembolso
    documentos: Documento[]; // Lista de documentos asociados
    estado: string; // Estado del reembolso (aprobado, en revisión, rechazado)
    username: string; // Usuario asociado al reembolso
  }
  
  export interface Documento {
    nombre: string; // Nombre del documento
    url: string; // URL del documento (para descargar o ver)
  }