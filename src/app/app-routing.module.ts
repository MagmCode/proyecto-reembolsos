import { NgModule } from '@angular/core';
import { NoAuthGuard } from "./core/auth/guards/no-auth.guard";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';

const routes: Routes = [

  {path: '', pathMatch : 'full', redirectTo: 'sign-in'},
  {
      path: '',
      canActivate: [NoAuthGuard],
      canActivateChild: [NoAuthGuard],
      data: {
          layout: 'empty'
      },
      children: [
          {path: '', children: [
              {path: 'sign-in', component: SignInComponent},
              {path: 'sign-up', component: SignUpComponent}
            ]},
      ]
  
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
