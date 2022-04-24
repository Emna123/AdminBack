import { Component, OnChanges, OnInit } from '@angular/core';
import { Manager } from '../../model/Manager';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../model/ResetPassword';
@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnChanges {
resp:ResetPassword =new ResetPassword ()
  constructor(private authService: AuthService,private  route: ActivatedRoute,private router:Router) { }
   password:string;
  ngOnInit(): void { }
  type = "password";
  ntype = "AFFICHER";

  error: string ="";
  submitted: boolean = false;

  resetPassword(): void {
    this.resp.email = this.route.snapshot.queryParamMap.get("user_id");
    this.resp.token= this.route.snapshot.queryParamMap.get("token");
    console.log(this.resp);
    this.submitted = true;
    this.authService.resetPassword(this.resp)
    .subscribe(success => {
      if (success) 
      {
        this.router.navigate(['auth/login']);
      }  
      else{
        this.error ="Quelque chose ne va pas, veuillez réessayer !" ;
      }
      this.ngOnChanges();

    });
  }
ngOnChanges() {
 console.log("cheking...")
}   
  calt() {
    if (this.type == "password") {
      this.type = "text";
      this.ntype = "CACHER"
    }
    else {
      this.type = "password";
      this.ntype = "AFFICHER"
    }
  }

}
