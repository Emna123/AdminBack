import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})

export class ECommerceComponent implements OnInit {

  randomNumber: Observable<any>;

  constructor() {}

  ngOnInit() {
 
  }

 

}