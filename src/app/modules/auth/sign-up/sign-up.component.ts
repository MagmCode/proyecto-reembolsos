import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";

// Función de validación personalizada para contraseñas iguales
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const clave = control.get('clave');
  const confirmarClave = control.get('confirmarClave');

  if (clave && confirmarClave && clave.value !== confirmarClave.value) {
    return { passwordMismatch: true }; // Retorna un error si las contraseñas no coinciden
  }
  return null; // Retorna null si las contraseñas coinciden
};

// Función de validación personalizada para verificar si el usuario es mayor de edad
export const mayorDeEdadValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fechaNacimiento = control.value; // Obtiene la fecha de nacimiento del control

  if (!fechaNacimiento) {
    return null; // Si no hay fecha, no se aplica la validación
  }

  const fechaNacimientoDate = new Date(fechaNacimiento); // Convierte la fecha de nacimiento a un objeto Date
  const hoy = new Date(); // Obtiene la fecha actual
  const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear(); // Calcula la diferencia de años

  // Verifica si el usuario tiene al menos 18 años
  if (
    edad < 18 ||
    (edad === 18 && hoy < new Date(hoy.getFullYear(), fechaNacimientoDate.getMonth(), fechaNacimientoDate.getDate()))
  ) {
    return { menorDeEdad: true }; // Retorna un error si el usuario es menor de edad
  }

  return null; // Retorna null si el usuario es mayor de edad
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hide = true;
  hide2 = true;

  // Controles de formulario
  nombre!: FormControl;
  apellido!: FormControl;
  tipoCedula!: FormControl;
  cedula!: FormControl;
  fechaNacimiento!: FormControl;
  telefono!: FormControl;
  telefonoOpcional!: FormControl;
  correo!: FormControl;
  clave!: FormControl;
  confirmarClave!: FormControl;
  aseguradora!: FormControl;
  nroPoliza!: FormControl;
  vigenteDesde!: FormControl;
  vigenteHasta!: FormControl;

  @ViewChildren('inputField') inputFields!: QueryList<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        cedula: ['', Validators.required], 
        tipoCedula: ['V', Validators.required],
        fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator]], 
        telefono: ['', Validators.required],
        telefonoOpcional: [''],
        correo: ['', [Validators.required, Validators.email]],
        clave: ['', Validators.required],
        confirmarClave: ['', Validators.required],
        aseguradora: ['', Validators.required],
        nroPoliza: ['', Validators.required],
        vigenteDesde: ['', Validators.required],
        vigenteHasta: ['', Validators.required],
      },
      { validators: [passwordMatchValidator] } // Aplica solo la validación de contraseñas
    );

    // Inicializa los controles del formulario
    this.nombre = this.signUpForm.get('nombre') as FormControl;
    this.apellido = this.signUpForm.get('apellido') as FormControl;
    this.tipoCedula = this.signUpForm.get('tipoCedula') as FormControl;
    this.cedula = this.signUpForm.get('cedula') as FormControl;
    this.fechaNacimiento = this.signUpForm.get('fechaNacimiento') as FormControl;
    this.telefono = this.signUpForm.get('telefono') as FormControl;
    this.telefonoOpcional = this.signUpForm.get('telefonoOpcional') as FormControl;
    this.correo = this.signUpForm.get('correo') as FormControl;
    this.clave = this.signUpForm.get('clave') as FormControl;
    this.confirmarClave = this.signUpForm.get('confirmarClave') as FormControl;
    this.aseguradora = this.signUpForm.get('aseguradora') as FormControl;
    this.nroPoliza = this.signUpForm.get('nroPoliza') as FormControl;
    this.vigenteDesde = this.signUpForm.get('vigenteDesde') as FormControl;
    this.vigenteHasta = this.signUpForm.get('vigenteHasta') as FormControl;
  }

  onSubmit() {
    console.log('Estado del formulario:', this.signUpForm.status); // Debe ser "VALID"
    console.log('Errores del formulario:', this.signUpForm.errors); // Debe ser null
    console.log('Valores del formulario:', this.signUpForm.value);
  
    // Marca todos los campos como "touched" para forzar la validación
    this.signUpForm.markAllAsTouched();
  
    // Validación manual de la cédula
    const tipoCedula = this.signUpForm.get('tipoCedula')?.value;
    const cedula = this.signUpForm.get('cedula')?.value;
  
    if (tipoCedula === 'V') {
      // Validación para cédula venezolana (V)
      const cedulaValida = /^\d{8}$/.test(cedula); // Debe tener exactamente 8 dígitos
      const numeroValido = parseInt(cedula, 10) >= 1000000 && parseInt(cedula, 10) <= 60000000; // Debe ser mayor o igual a 1 millón y menor o igual a 60 millones
      const esSecuenciaConsecutiva = /(0123|012456789|987654321|123456|(\d)\2{7,})/.test(cedula); // Verifica secuencias
  
      if (!cedulaValida || !numeroValido || esSecuenciaConsecutiva) {
        this.cedula.setErrors({ cedulaInvalida: 'Ingrese una cédula venezolana válida' });
      } else {
        this.cedula.setErrors(null); // Limpia los errores si la cédula es válida
      }
    } else if (tipoCedula === 'E') {
      // Validación para cédula extranjera (E)
      const cedulaValida = /^\d{8,10}$/.test(cedula); // Debe tener entre 8 y 10 dígitos
      const numeroValido = parseInt(cedula, 10) >= 80000000; // Debe ser mayor o igual a 80 millones
      const esSecuenciaConsecutiva = /(0123|012456789|987654321|123456|(\d)\2{7,})/.test(cedula); // Verifica secuencias
  
      if (!cedulaValida || !numeroValido || esSecuenciaConsecutiva) {
        this.cedula.setErrors({ cedulaInvalida: 'Ingrese una cédula extranjera válida' });
      } else {
        this.cedula.setErrors(null); // Limpia los errores si la cédula es válida
      }
    }
  
    // Validación manual del teléfono
    const telefono = this.signUpForm.get('telefono')?.value;
    const telefonoOpcional = this.signUpForm.get('telefonoOpcional')?.value;
    const codigosValidos = [
      '0212', '0241', '0251', '0234', '0243', '0244', '0245', '0246', '0247', '0248', '0249', // Códigos locales
      '0412', '0414', '0416', '0424', '0426', '0416', '0426', '0416', '0426', // Códigos de celulares
    ];
  
    // Validación para el teléfono requerido
    if (telefono) {
      const codigoArea = telefono.slice(0, 4); // Obtiene los primeros 4 dígitos
      const telefonoValido = /^\d{11}$/.test(telefono); // Debe tener exactamente 11 dígitos
      const codigoValido = codigosValidos.includes(codigoArea); // Verifica si el código de área es válido
  
      if (!telefonoValido) {
        if (telefono.length < 11) {
          this.telefono.setErrors({ telefonoInvalido: 'El teléfono es inválido.' });
        } else {
          this.telefono.setErrors({ telefonoInvalido: 'El teléfono es inválido.' });
        }
      } else if (!codigoValido) {
        this.telefono.setErrors({ telefonoInvalido: 'El código de área no es válido.' });
      } else {
        this.telefono.setErrors(null); // Limpia los errores si el teléfono es válido
      }
    }
  
    // Validación para el teléfono opcional
    if (telefonoOpcional) {
      const codigoAreaOpcional = telefonoOpcional.slice(0, 4); // Obtiene los primeros 4 dígitos
      const telefonoOpcionalValido = /^\d{11}$/.test(telefonoOpcional); // Debe tener exactamente 11 dígitos
      const codigoOpcionalValido = codigosValidos.includes(codigoAreaOpcional); // Verifica si el código de área es válido
  
      if (!telefonoOpcionalValido) {
        if (telefonoOpcional.length < 11) {
          this.telefonoOpcional.setErrors({ telefonoOpcionalInvalido: 'El teléfono es inválido.' });
        } else {
          this.telefonoOpcional.setErrors({ telefonoOpcionalInvalido: 'El teléfono es inválido.' });
        }
      } else if (!codigoOpcionalValido) {
        this.telefonoOpcional.setErrors({ telefonoOpcionalInvalido: 'El código de área no es válido.' });
      } else {
        this.telefonoOpcional.setErrors(null); // Limpia los errores si el teléfono es válido
      }
    }
  
    // Verifica si las contraseñas coinciden
    if (this.clave.value !== this.confirmarClave.value) {
      // Marca ambos campos como inválidos
      this.clave.setErrors({ passwordMismatch: true });
      this.confirmarClave.setErrors({ passwordMismatch: true });
      this.clave.markAsTouched(); // Marca el campo como "touched" para mostrar el error
      this.confirmarClave.markAsTouched(); // Marca el campo como "touched" para mostrar el error
      return; // Detiene la ejecución si las contraseñas no coinciden
    }
  
    if (this.signUpForm.valid) {
      // Combina el tipo de cédula (V o E) con el número de cédula
      const tipoCedula = this.signUpForm.get('tipoCedula')?.value;
      const cedula = this.signUpForm.get('cedula')?.value;
      const cedulaCompleta = `${tipoCedula}-${cedula}`;
  
      // Crea el objeto userData con la cédula completa
      const userData = {
        ...this.signUpForm.value,
        cedula: cedulaCompleta, // Sobrescribe el valor de la cédula
      };
  
      // Envía los datos al backend
      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.signUpForm.reset();
  
          // Muestra un mensaje de éxito
          this.snackBar.open('¡Registro exitoso! Serás redirigido al login.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
  
          // Redirige al login después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['Login']);
          }, 3000);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          this.snackBar.open('Error al registrar usuario. Verifica los datos e intenta nuevamente.', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      );
    } else {
      console.log('Formulario inválido. Errores:', this.signUpForm.errors);
    }
  }

  ngAfterViewInit() {
    this.inputFields.forEach(input => {
      input.nativeElement.addEventListener('copy', this.disableCopyPaste);
      input.nativeElement.addEventListener('paste', this.disableCopyPaste);
      input.nativeElement.addEventListener('cut', this.disableCopyPaste);
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  togglePasswordVisibility2() {
    this.hide2 = !this.hide2;
  }

  disableCopyPaste(event: Event): void {
    event.preventDefault();
  }

  onClose() {
    this.router.navigate(['']);
  }
}