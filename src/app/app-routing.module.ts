import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { NoAuthGuard } from "./core/auth/guards/no-auth.guard";
import { HomePageComponent } from './modules/user/home-page/home-page.component';

const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: SignInComponent, canActivate: [NoAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [NoAuthGuard] },
  { path: '**', redirectTo: 'sign-in' },

// Route to User's Home Page
  {path: 'home', component: HomePageComponent, canActivate: [NoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
