import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  recoveryForm!: FormGroup;
  passwordForm!: FormGroup;
  hide = true;
  hide2 = true;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      cedula: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.passwordForm = this.fb.group({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  onSubmit(stepper: any) {
    const emailControl = this.recoveryForm.get('email');
    if (this.recoveryForm.valid && this.validateEmail(emailControl?.value)) {
      console.log(this.recoveryForm.value);
      stepper.next(); // Avanzar al siguiente paso del Stepper
    } else {
      if (emailControl) {
        emailControl.markAsTouched(); // Marca el control como tocado para que el mat-error se muestre
      }
    }
  }

  onPasswordSubmit() {
    const newPassword = this.passwordForm.get('newPassword');
    const confirmPassword = this.passwordForm.get('confirmPassword');

    if (this.passwordForm.valid && newPassword?.value === confirmPassword?.value) {
      console.log('Nueva contraseña:', newPassword?.value);
      alert('Contraseña actualizada');
      this.router.navigate(['/Login']); // Redirige a la página de inicio
    } else if (this.passwordForm.valid && newPassword?.value != confirmPassword?.value){
      console.log('Contraseña no coincide: ', newPassword?.value, ' ', confirmPassword?.value)
      alert('Las contraseñas deben ser iguales')
    }else {
        newPassword?.markAsTouched();
        confirmPassword?.markAsTouched();
      
    }
  }

  validateEmail(email: string | null): boolean {
    if (!email) return false;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/; // Valida el formato básico de correo electrónico
    return emailPattern.test(email);
  }

  togglePasswordVisibility(){
    this.hide = !this.hide;
  }

  togglePasswordVisibility2(){
    this.hide2 = !this.hide;
  }

  getErrorMessage(controlName: string) {
    const control = this.recoveryForm.get(controlName) || this.passwordForm.get(controlName);
    if (control?.hasError('required')){
      return 'Por favor rellene el campo';
    } else if (controlName === 'email' && control?.hasError('email')){
      return 'Correo no válido';
    } else if (controlName === 'newPassword' && control?.value !== this.passwordForm.get('confirmPassword')?.value) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  signIn() {
    this.router.navigate(['/Login']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }
}
