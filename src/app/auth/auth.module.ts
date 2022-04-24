import { LoginComponent } from './login/login.component'; // <---
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { NbCardModule, NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { AuthComponent } from './auth.component';
import { HttpClientModule} from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { CheckEmailComponent } from './check-email/check-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbCardModule,
    HttpClientModule,

  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
    CheckEmailComponent
    // <---
  ],
})
export class AuthModule {
}