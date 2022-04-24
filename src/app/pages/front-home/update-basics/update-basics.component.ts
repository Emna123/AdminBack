import { Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef, OnInit, } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {period } from "../../../list/period";
import { FrontHome } from '../../../model/FrontHome';
import { FrontUpdateService } from '../../../services/front-update.service';
@Component({
  selector: 'ngx-update-basics',
  templateUrl: './update-basics.component.html',
  styleUrls: ['./update-basics.component.scss']

})
export class UpdateBasicsComponent implements  AfterViewInit, OnInit {
    front = new FrontHome();
    periodList=period;
    image1=null;
    image2=null;
    promo: boolean = true;
   error="";
  
    @Output() editorKeyup = new EventEmitter<any>();
  
  
    constructor(
      private router:Router,
      private alertService:AlertService,
      private host: ElementRef,
      private  route: ActivatedRoute,
      private frontUpdateService:FrontUpdateService,
      private locationStrategy: LocationStrategy,
    ) { }
  
  
  
  
    ngOnInit(): void {

      this.frontUpdateService.getFrontHome().subscribe(fr => {
        if (fr!=null) {
             this.front=fr
             if(this.front.historical_text!=null)
             {tinymce.activeEditor.setContent(this.front.historical_text);}
 
          }
        else {
          console.log("Faild...");
  
        }
      });
    }
 
  
    ngAfterViewInit() {
      var p = this.host.nativeElement.querySelector('.car').textContent = "";
  
      tinymce.init({
        target: this.host.nativeElement.querySelector('.car'),
  
        plugins: ['paste'],
        skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
        setup: editor => {
  
  
          editor.on('keyup', () => {
            this.editorKeyup.emit(editor.getContent());
            this.front.historical_text = editor.getContent();
          });
        },
  
        height: '190',
        width: '100%',
  
      });
    }


    onselect(e,val) {
      if (e.target.files) {
          if (e.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            if (val==1)
           { this.image1=e.target.files[0];
            reader.onload = (events: any) => {
              this.front.femmeCollection_image=events.target.result;
            }
          }
            else
            { this.image2=e.target.files[0];
              reader.onload = (events: any) => {
                this.front.hommeCollection_image=events.target.result;
              }
            }
          }
        }
      
  
    }
  

  

  
    update() {
      this.front.historical_text =tinymce.activeEditor.getContent();
      this.frontUpdateService.Update(this.front,this.image1,this.image2)
        .subscribe(success => {
          if (success) {
            this.router.navigateByUrl('/front-home/UpdateComponent',{skipLocationChange:true}).then(()=>{
              this.router.navigate(['/pages/front-home']);})
            this.showToast(); 
          }
          else {
          this.error="Une erreur s'est produite. Veuillez réessayer"
          }
        });
    }
    resetImage1() {
      this.front.femmeCollection_image = null;
      this.image1 = null;
    }
    resetImage2() {
      this.front.hommeCollection_image = null;
      this.image1 = null;
    }
    showToast() {
      this.alertService.showToast("Modifications enregistrées avec succès")
  
    }
  

  }