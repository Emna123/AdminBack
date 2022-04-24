import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ResetPassword } from '../model/ResetPassword';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../config';
import { Tokens } from '../model/tokens';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient) { }

//Login function
  login(user): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}Authentication/LoginManager`, user)
      .pipe(
        tap(tokens => { this.doLoginUser(user.Email, tokens); }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

//Logout function
  logout() {
    return this.http.post<any>(`${config.apiUrl}Authentication/logout/${this.getEmail()}`, {
      'refreshtoken': this.getRefreshToken(),
      'token': this.getJwtToken()

    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

//check if the user is logged in
  isLoggedIn() {
    return !!this.getJwtToken();
  }

//Refresh token function
  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}Authentication/RefreshToken`, {
      "ExpiredToken": this.getJwtToken(),
      "RefreshToken": this.getRefreshToken(),
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens);

    }));
  }

//Return token
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: Tokens) {
    localStorage.setItem('EMAIL', email);
    this.storeTokens(tokens);
  }

  //Return user email
  getEmail() {
    return localStorage.getItem('EMAIL');
  }

  //Localstorage evacuation
  private doLogoutUser() {
    localStorage.removeItem('EMAIL');
    this.removeTokens();
  }

  //return RefreshToken
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }


//Save tokens in local storage 
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshtoken);
  }

  //remove tokens from local storage
  public removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }


//Send reset password request to backend 
  requestPassword(email: string): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}Authentication/RequestPassword`, { "email": email }).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

//Reset password
  resetPassword(resp: ResetPassword): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}Authentication/ResetPassword`, resp).pipe(
      tap(result => { console.log(result) }),
      mapTo(true),
      catchError(error => {
        console.log(error);
        return of(false);
      }));
  }

}

