import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { NoAuthGuard } from "./core/auth/guards/no-auth.guard";
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { ReembolsoComponent } from './modules/user/reembolso/reembolso.component';
import { CartaAvalComponent } from './modules/user/carta-aval/carta-aval.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'sign-in' },
  { path: 'forgot-password', component: ForgotPasswordComponent },


// Route to User's Home Page
  {path: 'user/home-page', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'user/reembolso', component: ReembolsoComponent, canActivate: [NoAuthGuard]},
  {path: 'user/carta-aval', component: CartaAvalComponent, canActivate: [NoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
