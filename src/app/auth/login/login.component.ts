import { Component,OnChanges } from '@angular/core';
import {Manager} from '../../model/Manager';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'nb-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnChanges {

  constructor(private authService: AuthService,  private router: Router) { }

  manager =new Manager();
  type = "password";
  ntype = "AFFICHER";

  error: string ="";
 
  submitted: boolean = false;

  login(): void {
    this.submitted = true;
    console.log(this.manager);
    this.authService.login(this.manager    )
    .subscribe(success => {
      if (success) 
      {
        window.location.href="http://localhost:4200/pages";
      }  
     else{  this.submitted=false;
        this.error ="Email et/ou mot de passe incorrect(s)!" ;
     }
    });
  }

ngOnChanges() {
 console.log("cheking...")
}   
calt() {
  if (this.type == "password") 
  {
      this.type = "text";
      this.ntype = "CACHER"
  }
  else {
      this.type = "password";
      this.ntype = "AFFICHER"
    }
  }

}






































/*import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})

export class NgxLoginComponent extends  NbLoginComponent {
  authService :AuthService ;

  type = "password";
  ntype = "AFFICHER";
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
  user: any;*/

  /*login(f: NgForm): void {
    this.user = { "password": f.value.password, "email": f.value.email };
    console.log("work")
    console.log(f.value);
    console.log(f.valid);

    this.authService.login(
      {
        email: this.user.email,
        password: this.user.password
      }
    )
      .subscribe(success => {
        if (success) {
          //this.router.navigate(['/secret-random-number']);
          console.log("succ");
        }
      });


  }*/

  /*
    protected service: NbAuthService;
      protected options: {};
      protected cd: ChangeDetectorRef;
      protected router: Router;
      redirectDelay: number;
      showMessages: any;
      strategy: string;
      errors: string[];
      messages: string[];
      user: any;
      submitted: boolean;
      socialLinks: NbAuthSocialLink[];
      rememberMe: boolean;
      constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router);
      login(): void ;
      getConfigValue(key: string): any;
      static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NbLoginComponent, never>;
      static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<NbLoginComponent, "nb-login", never, {}, {}, never, never>;
  */





















  /*
  ngOnInit() {
    this.service
    .isAuthenticated()
      .pipe(take(1))
        .subscribe(res => {
      if (!res) {
          this.service 
           .authenticate("custom name", { username: 'this data send to login endpoint that set in strategy coreModule', password: '....'}) 
            .pipe(take(1))
            .subscribe(
           res => {
             if (res.isSuccess()) 
               return this.router.navigate([res.getRedirect()]); <== redirect url that set in strategy
             return this.redirectToAuth(); 
           },
           err => {
             return this.redirectToAuth();
           }
         );
   }
   this.router.navigate(["/pages/dashboard"]);
  });
  }
  private redirectToAuth() {
   /// redirect to login
  }
  }*/


  /*onSubmit(f: NgForm) {
    console.log("work")
    console.log(f.value);
    console.log(f.valid);*/
    /*
   if(f.valid==true){
   this.clientService.ClientAuthentication(f.value.Email,f.value.Password).subscribe(
    (req:any)=>{
      console.log(req);
      localStorage. setItem('clientToken',req.token);
      localStorage.setItem('refreshtoken',req.refreshtoken);
      console.log( localStorage.clientToken);
      this.router.navigate([''])
  
      .then(() => {
        window.location.reload();
      });
         
    },
    (err: HttpErrorResponse)=>{
      this.isLoginError = true;
      this.er="Email et/ou mot de passe incorrect(s)!";
  
      console.log(err);
    });*/
  //}


  /*
  this.clientService.registerClient(f.value).subscribe(
      (req:any)=>{
        console.log(req);

      },
      (err: any)=>{
          console.log(err.status);
          console.log(err);
        if(err.status == 500){
         this.er="Cette adresse mail est déjà utilisée!";
        }
        else
        {
            if(err.status == 400)
            {
                this.er="Une erreur s'est produite. Veuillez réessayer!";
            }
            else        
            this.resetForm();

        }
      }
    );

}*/

//}