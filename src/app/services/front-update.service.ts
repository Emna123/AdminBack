import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../config';
import { FrontHome } from '../model/FrontHome';

@Injectable({
  providedIn: 'root'
})
export class FrontUpdateService {

  constructor(private http: HttpClient) { }

  //Update Front basics
  Update(front, file1, file2): Observable<boolean> {
    const formData: FormData = new FormData();
    if (file1 != null) {
      formData.append('femmeCollection_image', file1);
    }
    else {
      formData.append('femmeCollection_image', null);

    }
    if (file2 != null) {
      formData.append('hommeCollection_image', file2);

    }
    else {
      formData.append('hommeCollection_image', null);

    }
    formData.append('animated_text', front.animated_text);
    formData.append('historical_text', front.historical_text);
    console.log("form data", formData);

    return this.http.put<any>(`${config.apiUrl}FrontHome/Update/${front.id}`, formData)
      .pipe(
        tap(result => {
          console.log(result);

        }),
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

  //Get Front by id
  getFrontHome(): Observable<any> {
    var frontHome = new FrontHome();
    return this.http.get<any>(`${config.apiUrl}FrontHome/GetFrontHome/1`).pipe(
      tap(front => {
        frontHome.id = front.id;
        frontHome.femmeCollection_image = config.imgUrl + front.femmeCollection_image;
        frontHome.hommeCollection_image = config.imgUrl + front.hommeCollection_image;
        frontHome.animated_text = front.animated_text;
        frontHome.historical_text = front.historical_text

        console.log(front)
      }),
      mapTo(frontHome),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }
}
