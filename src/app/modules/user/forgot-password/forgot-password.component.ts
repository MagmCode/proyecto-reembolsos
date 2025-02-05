import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  recoveryForm!: FormGroup;
  passwordForm!: FormGroup;
  hide = true;
  hide2 = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      cedula: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });

    this.passwordForm = this.fb.group({
      newPassword: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
    });
  }

  onSubmit(stepper: any) {
    const emailControl = this.recoveryForm.get("email");
    if (this.recoveryForm.valid && this.validateEmail(emailControl?.value)) {
      console.log(this.recoveryForm.value);
      stepper.next();
    } else {
      if (emailControl) {
        emailControl.markAsTouched();
      }
    }
  }

  onPasswordSubmit() {
    const newPassword = this.passwordForm.get("newPassword");
    const confirmPassword = this.passwordForm.get("confirmPassword");

    if (
      this.passwordForm.valid &&
      newPassword?.value === confirmPassword?.value
    ) {
      console.log("Nueva contraseña:", newPassword?.value);
      this._snackBar.open("Contraseña Actualizada", "cerrar", {
        duration: 3000,
      });
      this.router.navigate(["/Login"]);
    } else if (
      this.passwordForm.valid &&
      newPassword?.value != confirmPassword?.value
    ) {
      console.log(
        "Contraseña no coincide: ",
        newPassword?.value,
        " ",
        confirmPassword?.value
      );
      this._snackBar.open("Las contraseñas deben ser iguales", "Cerrar", {
        duration: 3000,
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  validateEmail(email: string | null): boolean {
    if (!email) return false;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    return emailPattern.test(email);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  togglePasswordVisibility2() {
    this.hide2 = !this.hide2;
  }

  getErrorMessage(controlName: string) {
    const control =
      this.recoveryForm.get(controlName) || this.passwordForm.get(controlName);
    if (control?.hasError("required")) {
      return "Por favor rellene el campo";
    } else if (controlName === "email" && control?.hasError("email")) {
      return "Correo no válido";
    } else if (
      controlName === "newPassword" &&
      control?.value !== this.passwordForm.get("confirmPassword")?.value
    ) {
      return "Las contraseñas no coinciden";
    }
    return "";
  }

  signIn() {
    this.router.navigate(["/Login"]);
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]);
  }
}
