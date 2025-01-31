import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hide = true;
  hide2 = true;

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
  titular!: FormControl;
  cedulaTitular!: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      tipoCedula: ['V', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      telefonoOpcional: [''],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      confirmarClave: ['', Validators.required],
      aseguradora: ['', Validators.required],
      nroPoliza: ['', Validators.required],
      vigenteDesde: ['', Validators.required],
      vigenteHasta: ['', Validators.required],
      cedulaTitular: [''],
      titular: ['', Validators.required],
    });

    this.nombre = this.signUpForm.get('nombre') as FormControl;
    this.apellido = this.signUpForm.get('apellido') as FormControl;
    this.tipoCedula = this.signUpForm.get('tipoCedula') as FormControl;
    this.cedula = this.signUpForm.get('cedula') as FormControl;
    this.fechaNacimiento = this.signUpForm.get('fechaNacimiento') as FormControl;
    this.telefono = this.signUpForm.get('telefono') as FormControl;
    this.telefonoOpcional = this.signUpForm.get('telefonoOpcional') as FormControl;
    this.correo = this.signUpForm.get('correo') as FormControl;
    this.clave = this.signUpForm.get('clave') as FormControl;
    this.confirmarClave = this.signUpForm.get('confirmeClave') as FormControl;
    this.aseguradora = this.signUpForm.get('aseguradora') as FormControl;
    this.nroPoliza = this.signUpForm.get('nroPoliza') as FormControl;
    this.vigenteDesde = this.signUpForm.get('vigenciaDesde') as FormControl;
    this.vigenteHasta = this.signUpForm.get('vigenciaHasta') as FormControl;
    this.titular = this.signUpForm.get('titular') as FormControl;
    this.cedulaTitular = this.signUpForm.get('cedulaTitular') as FormControl;

    this.onTitularChange({values: this.titular.value});
  }

  onTitularChange(event: any): void{
    if (event.values === '2') {
      this.cedulaTitular.setValidators([Validators.required]);
    } else {
      this.cedulaTitular.clearValidators();
    }
    this.cedulaTitular.updateValueAndValidity();
  }

  

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.signUpForm.reset();
      this.router.navigate(['Login']);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  onClose() {
    this.router.navigate(['']);
  }



}
