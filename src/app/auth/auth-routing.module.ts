import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'; // <---
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import {CheckEmailComponent} from './check-email/check-email.component'
export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'reset-password',
        component:  ResetPasswordComponent , 
      },
      {
        path: 'request-password',
        component:  RequestPasswordComponent , 
      },
      {
        path: 'check-email',
        component: CheckEmailComponent , 
      },
      {
        path: '',
        component:LoginComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}