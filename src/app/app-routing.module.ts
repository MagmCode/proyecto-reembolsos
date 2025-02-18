import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { ReembolsoComponent } from './modules/user/reembolso/reembolso.component';
import { CartaAvalComponent } from './modules/user/carta-aval/carta-aval.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EditProfileComponent } from './modules/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/user/change-password/change-password.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ReembolsoAdminComponent } from './modules/admin/reembolso-admin/reembolso-admin.component';
import { CartaavalAdminComponent } from './modules/admin/cartaaval-admin/cartaaval-admin.component';
import { EditProfileAdminComponent } from './modules/admin/edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './modules/admin/change-password-admin/change-password-admin.component';
import { HistorialComponent } from './modules/admin/historial/historial.component';
import { AsignProfileComponent } from './modules/admin/asign-profile/asign-profile.component';
import { UserGuard } from './core/guards/user.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UnauthorizedComponent } from './modules/pages/unauthorized/unauthorized.component';
import { ReportesComponent } from './modules/admin/reportes/reportes.component';
import { DetalleReembolsoComponent } from './modules/admin/detalle-reembolso/detalle-reembolso.component';
import { DetalleCartaavalComponent } from './modules/admin/detalle-cartaaval/detalle-cartaaval.component';

const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'sign-in' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },


// Routes to User's components
  {path: 'user/home-page', component: HomePageComponent, canActivate: [UserGuard]},
  {path: 'user/reembolso', component: ReembolsoComponent, canActivate: [UserGuard]},
  {path: 'user/carta-aval', component: CartaAvalComponent, canActivate: [UserGuard]},
  {path: 'user/editar-perfil', component: EditProfileComponent, canActivate: [UserGuard]},
  {path: 'user/cambiar-password', component: ChangePasswordComponent, canActivate: [UserGuard]},

// Routes to Admin's components
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'admin/reembolso', component: ReembolsoAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/carta-aval', component: CartaavalAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/editar-perfil', component: EditProfileAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/cambiar-password', component: ChangePasswordAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/historial', component: HistorialComponent, canActivate: [AdminGuard]},
  {path: 'admin/asignar-perfil', component: AsignProfileComponent, canActivate: [AdminGuard]},
  {path: 'admin/reportes', component: ReportesComponent, canActivate: [AdminGuard]},
  {path: 'admin/reembolso/detalle/:id', component: DetalleReembolsoComponent, canActivate: [AdminGuard]},
  {path: 'admin/carta-aval/detalle/:id', component: DetalleCartaavalComponent, canActivate: [AdminGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
