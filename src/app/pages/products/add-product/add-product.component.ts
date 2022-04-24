import { Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef, OnInit, } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { LocationStrategy } from '@angular/common';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { size } from "../../../list/size";
import { Router } from '@angular/router';
import { period } from "../../../list/period";

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],

})
export class AddProductComponent implements  AfterViewInit, OnInit {
  prod = new Product();
  sizeListe = size;
  periodList = period;
  image = [];
  brands = [];
  promo: boolean = false;
  error = "";

  @Output() editorKeyup = new EventEmitter<any>();


  constructor(
    private router: Router,
    private alertService: AlertService,
    private host: ElementRef,
    private productService: ProductService,
    private brundService: BrandService,
    private locationStrategy: LocationStrategy,
  ) { }
  ngOnInit(): void {
    this.brundService.getBrands()
      .subscribe(success => {
        if (success) {
          this.brands = success;
          this.prod.brandName = this.brands[0].brand_name;
          this.prod.brandid = this.brands[0].id;
          console.log(this.brands[0].id)
        }
        else {
          console.log("faild..");
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
          this.prod.description = editor.getContent();
        });
      },

      height: '170px',
      width: '100%',

    });
  }

  /*ngOnDestroy() {

    tinymce.remove(this.prod.description);
  }*/

  onselect(e) {
    if (e.target.files) {
      for (let i = 0; i < File.length; i++) {
        if (e.target.files[i]) {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          this.image.push(e.target.files[i]);
          reader.onload = (events: any) => {
            this.prod.prod_image.push(events.target.result);
          }
        }
      }
    }
    console.log(this.sizeListe);

  }

  getBrandName(): void {
    this.brands.forEach(element => {
      if (element.id == this.prod.brandid)
        this.prod.brandName = element.brand_name;
    });
  }
  getPeriod(): void {
    this.periodList.forEach(element => {
      if (element.value == this.prod.exp_period)
        this.prod.exp_periodTitle = element.title;
    });
  }
  getsizeListe() {
    if (this.prod.category == "Accessoires") {
      return this.sizeListe.accessorys;
    }
    else {
      if (this.prod.category == "Chaussures") {

        return this.sizeListe.shoes;
      }
      else {
        return this.sizeListe.Clothes
      }
    }
  }

  addProduct() {
    this.prod.description =tinymce.activeEditor.getContent();
    if (this.prod.old_price == null) {
      this.prod.old_price = this.prod.price;
    }
    if (this.prod.quantity < this.prod.qnt_sold) {
      this.error = "La quantité totale doit être supérieure à Quantité vendue.";

    }
    else
      if (this.prod.old_price < this.prod.price) {
        this.error = "Le prix avant promotion doit être inférieur ou égale (pas de promotion) au prix.";

      }
      else {
       var s=[]
        for(var i=0;i<this.prod.size.length;i++)
            s.push(this.prod.size[i].size)
        this.prod.size=s;
        if(this.prod.exp_period!=-1)
       { this.prod.exp_date=new Date();
        this.prod.exp_date.setDate( this.prod.exp_date.getDate() + this.prod.exp_period );
       }
       else
      {this.prod.exp_date=null;}
      console.log(this.prod)
       this.productService.addProduct(this.prod, this.image)
          .subscribe(success => {
            if (success) {
              this.router.navigateByUrl('/products/ListProductsComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/pages/products']);
              });
              this.showToast();
            }
            else {
              this.error = "Une erreur s'est produite. Veuillez réessayer"
            }
          });
      }
  }
  resetImage() {
    this.prod.prod_image = [];
    this.image = [];

  }

  showToast() {
    this.alertService.showToast("Produit ajouté avec succès")

  }
  checkPromo() {
    this.prod.old_price = this.prod.price;
  }
}