
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Product } from '../model/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  //Upload product images
  upload(files: any, idprod: number): Observable<boolean> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('idProduct', idprod.toString());
    return ajax.post(`${config.apiUrl}Prod_image/upload`, formData, { 'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}` }).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

  //Add new product
  addProduct(product, files): Observable<boolean> {
    product.prod_image = [];
    console.log(product);
    return this.http.post<any>(`${config.apiUrl}Product/AddProduct`, product)
      .pipe(
        tap(result => {
          console.log(result.idProduct);
          this.upload(files, result.idProduct).subscribe(success => {
            if (success) {
              console.log(success);
            }
            else {
              console.log("faild..");
            }
          })
        }),
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }
  
  //Product List
  getProducts(): Observable<any> {
    var products = [];
    return this.http.get<any>(`${config.apiUrl}Product/GetProducts`).pipe(
      tap(prod => {
        console.log(prod)
        prod.forEach(element => {
          var product = new Product();

          product.id = element.id;
          product.productName = element.productName;
          product.quantity = element.quantity;
          product.price = element.price;
          product.qnt_sold = element.qnt_sold;
          product.prod_image = element.prod_image
          if (element.new_prod == false)
            product.new_prod = "Non";
          else
            product.new_prod = "Oui";
          if (element.best_prod == false)
            product.best_prod = "Non";
          else
            product.best_prod = "Oui";
          product.old_price = element.old_price;
          products.push(product);
        });
      }),

      mapTo(products),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

  //Get product by id
  getProduct(id): Observable<any> {
    var product = new Product();
    return this.http.get<any>(`${config.apiUrl}Product/GetProduct/${id}`).pipe(
      tap(prod => {
        product.id = prod.id;
        product.productName = prod.productName;
        product.price = prod.price;
        product.quantity = prod.quantity;
        product.qnt_sold = prod.qnt_sold;
        product.old_price = prod.old_price;
        product.description = prod.description;
        product.category = prod.category;
        product.gender = prod.gender;
        product.size = prod.size;
        product.exp_date=prod.exp_date;
        product.new_prod = prod.new_prod;
        product.best_prod = prod.best_prod;
        product.Bestsell = prod.Bestsell;
        product.brandid = prod.brand.id;
        product.brandName = prod.brand.brand_name;
        product.exp_period = prod.exp_period;
        prod.prod_image.forEach(element => {
          product.prod_image.push(config.imgUrl + element.name)
        });
      }),

      mapTo(product),
      catchError(error => {
        console.log(error)
        return of(false);
      }));
  }

//Update Product from the list
  UpdateProductList(product): Observable<boolean> {
    return this.http.put<any>(`${config.apiUrl}Product/UpdateProductList/${product.id}`, product)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

//Update product
  UpdateProduct(product, files, deleteImage): Observable<boolean> {
    product.prod_image = [];
    return this.http.put<any>(`${config.apiUrl}Product/UpdateProduct/${product.id}`, product)
      .pipe(
        tap(result => {
          console.log(result);
          if (deleteImage == true)
            this.DeleteFiles(product.id).subscribe();
          this.upload(files, product.id).subscribe();
        }),
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

  //Delete product
  DeleteProduct(id): Observable<boolean> {
    return this.http.delete<any>(`${config.apiUrl}Product/DeleteProduct/${id}`)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }

  //delete product image
  DeleteFiles(id): Observable<boolean> {
    return this.http.delete<any>(`${config.apiUrl}Prod_image/DeleteProd_image/${id}`)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error)
          return of(false);
        }));
  }
}
