import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.loginForm.get('username') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/home']);
    }
  }

  
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Por favor rellene los campos';
    }
    return this.username.hasError('username') ? 'Not a valid username' : '';
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }
  
}