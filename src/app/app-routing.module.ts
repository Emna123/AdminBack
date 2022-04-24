import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import {AuthGuard} from'./auth/guards/auth.guard';
import {RandomGuard} from'./auth/guards/random.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RequestPasswordComponent } from './auth/request-password/request-password.component';
import {CheckEmailComponent}from './auth/check-email/check-email.component';
export const routes: Routes = [
  /*{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },*/
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      canActivate: [RandomGuard],
      canLoad: [RandomGuard]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]

      },
    /*  {
        path: 'register',
        component: NbRegisterComponent,
      },*/
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'check-email',
        component: CheckEmailComponent , 
      },
    ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
