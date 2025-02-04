import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  username!: FormControl;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.noExponentNotation]],
      password: ['', Validators.required]
    });

    this.username = this.loginForm.get('username') as FormControl;
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
      console.log(this.loginForm.value);
      this.router.navigate(['user/home-page']);
    }
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