import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service'; 
import { MatSnackBar } from "@angular/material/snack-bar";




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  hide = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.noExponentNotation]],
      password: ['', Validators.required]
    });

    this.username = this.loginForm.get('username') as FormControl;
    this.password = this.loginForm.get('password') as FormControl;
  }

  noExponentNotation(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.toString().toLowerCase().includes('e')) {
      return { 'noExponentNotation': true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response.access);  // Guardar el token en localStorage
          this.router.navigate(['user/home-page']);
        },
        (error) => {
          this.showSnackBar(error);  // Mostrar el mensaje de error en un SnackBar
        }
      );
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,  // Duración del mensaje en milisegundos (5 segundos)
      horizontalPosition: 'center',  // Posición horizontal
      verticalPosition: 'bottom',    // Posición vertical
      panelClass: ['error-snackbar']  // Clase CSS personalizada (opcional)
    });
  }

  
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  getErrorMessage() {
    if (this.loginForm.get('username')?.hasError('noExponentNotation')) {
      return 'No se permite la notación científica (e).';
    }
    return 'Campo inválido';
  }


  signUp() {
    this.router.navigate(['/sign-up']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }
  
}