import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  ClientService {

  constructor(private http: HttpClient) {}

  public getRandomNumber() {
    
    //Get  clients list 
    return this.http.get<any>(`${config.apiUrl}Client/GetClients`)
    .pipe(
      tap(tokens => {console.log(tokens) ;
    }),
      mapTo(true),
      catchError(error => {
        console.log(error);

        return of(false);
      }));
}
}
