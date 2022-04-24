import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../../../../model/Brand';
import { AlertService } from '../../../../services/alert.service';
import { BrandService } from '../../../../services/brand.service';
@Component({
  selector: 'ngx-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['../../add-product/add-product.component.scss']
})
export class AddbrandComponent {
  brand = new Brand();
  image = [];
  constructor(
    private brandService: BrandService, private alertService: AlertService, private router: Router
  ) { }

  onselect(e) {
    if (e.target.files) {
        if (e.target.files[0]) {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          this.image.push(e.target.files[0]);
          reader.onload = (events: any) => {
            this.brand.brand_image = events.target.result;
          }
        }
    }

  }

  addBrand() {
    this.brandService.addBrand(this.brand, this.image)
      .subscribe(success => {
        if (success) {
          this.router.navigateByUrl('/pages/products/brand/ListBrandsComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/pages/products/brand/list-brands']);
          });
          this.showToast();

        }
        else {
          console.log("faild..");

        }
      });
  }
  resetImage() {
    this.brand.brand_image = null;
    this.image = null;
  }
  showToast() {
    this.alertService.showToast("Marque ajouté avec succès")

  }
}