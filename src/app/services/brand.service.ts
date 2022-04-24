import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from "../model/Brand";
import { ajax } from 'rxjs/ajax';
import { config } from '../config';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  //Add new brand
  addBrand(brand: Brand, file: any): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', file[0]);
    formData.append('name', brand.brand_name.toString());
    console.log(formData)
    return ajax.post(`${config.apiUrl}Brand/add-brand`, formData, { 'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}` }).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

 //Get brand list
  getBrands(): Observable<any> {
    var brands = [];
    return this.http.get<any>(`${config.apiUrl}Brand/GetBrands`).pipe(
      tap(brds => {
        brds.forEach(element => {
          brands.push(element);
        });
      }),
      mapTo(brands),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }
  //Delete brand
  DeleteBrand(id): Observable<boolean> {
    return this.http.delete<any>(`${config.apiUrl}Brand/DeleteBrand/${id}`)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

  //Update product of list
  UpdateBrandList(brand): Observable<boolean> {
    return this.http.put<any>(`${config.apiUrl}Brand/UpdateBrandList/${brand.id}`, brand)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

  //get brand by id
  getBrand(id): Observable<any> {
    var brand = new Brand();
    return this.http.get<any>(`${config.apiUrl}Brand/GetBrand/${id}`).pipe(
      tap(brd => {
        brand.id = brd.id;
        brand.brand_image = config.imgUrl + brd.brand_image;
        brand.brand_name = brd.brand_name;

        console.log(brand)
      }),
      mapTo(brand),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

  //Update brand
  UpdateBrand(brand, file): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', file[0]);
    formData.append('name', brand.brand_name.toString());
    console.log("form data", formData);
    console.log("fata", brand, file);

    return this.http.put<any>(`${config.apiUrl}Brand/UpdateBrand/${brand.id}`, formData)
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

}
