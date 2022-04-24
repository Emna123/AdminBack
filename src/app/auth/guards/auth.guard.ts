import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
//Tells Angular router whether it can or cannot activate pages route
  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages']);
    }
    return !this.authService.isLoggedIn();
  }
}