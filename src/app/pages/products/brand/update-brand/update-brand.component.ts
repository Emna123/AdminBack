import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../../model/Brand';
import { AlertService } from '../../../../services/alert.service';
import { BrandService } from '../../../../services/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['../../add-product/add-product.component.scss']
})
export class UpdateBrandComponent implements OnInit {
  brand=new Brand();
  image = [];
  error=""
  constructor(
    private brandService: BrandService,
    private  route: ActivatedRoute,
    private router: Router,
    private alertService:AlertService,
  ) { }
  ngOnInit(): void {
    var id=this.route.snapshot.params.id;
    console.log(id)
    this.brandService.getBrand(id).subscribe(success => {
      if (success!=null) {
        this.brand=success
      }
      else {
        console.log("faild...");
      }
  })
}


  onselect(e) {
    if (e.target.files) {
        if (e.target.files[0]) {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          this.image.push(e.target.files[0]);
          reader.onload = (events: any) => {
            this.brand.brand_image=events.target.result;
          }
        }
    }

  }


  UpdateBrand() {
    this.brandService.UpdateBrand(this.brand,this.image)
      .subscribe(success => {
        if (success) {
          this.router.navigateByUrl('/pages/products/brand/ListBrandsComponent',{skipLocationChange:true}).then(()=>{
            this.router.navigate(['/pages/products/brand/list-brands']);
          this.showToast();        
        });
      }
        else {
        this.error="Une erreur s'est produite. Veuillez réessayer"
        }
      });}
  
  resetImage() {
    this.brand.brand_image = null;
    this.image = null;
  }
  showToast() {
    this.alertService.showToast("Marque modifié avec succès")

  }
}