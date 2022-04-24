import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService}from'../../services/auth.service'
@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnChanges {

  constructor(private authService:AuthService,private router:Router) { }
error:String="";
  requestPassword()
  {
    this.authService.requestPassword("t.fancy.manager@gmail.com").subscribe(success => {
      if (success) 
      {
        this.router.navigate(['auth/check-email']);
      }  
      else{

        this.error ="Quelque chose ne va pas, veuillez réessayer !" ;
      }
    });
  }
  ngOnChanges() {
    console.log("cheking...")
   }   

}
