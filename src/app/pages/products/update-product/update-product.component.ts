
import { Component,AfterViewInit, Output, EventEmitter, ElementRef, OnInit, } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { LocationStrategy } from '@angular/common';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { size } from "../../../list/size";
import { Router,ActivatedRoute } from '@angular/router';
import {period } from "../../../list/period";

@Component({
  selector: 'ngx-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['../add-product/add-product.component.scss'],
})
export class UpdateProductComponent implements  AfterViewInit, OnInit {
  prod = new Product();
  periodList=period;
  currentDate : Date =new Date();
  sizeListe = size;
  deleteImage=false;
  image = [];
  brands = [];
  promo: boolean = true;
 error="";
  @Output() editorKeyup = new EventEmitter<any>();
  constructor(
    private router:Router,
    private  route: ActivatedRoute,
    private alertService:AlertService,
    private host: ElementRef,
    private productService: ProductService,
    private brundService: BrandService,
    private locationStrategy: LocationStrategy,
  ) { }




  ngOnInit(): void {
    
    var id=this.route.snapshot.params.id;
    this.productService.getProduct(id).subscribe(success => {
      if (success!=null) {
        this.prod = success;
        console.log("date",this.prod.exp_date)
        if(this.prod.old_price==this.prod.price)
        {
        this.promo=false;
        this.prod.exp_period=-1;
        }

        if(this.prod.description!=null)
        tinymce.activeEditor.setContent(this.prod.description);
 
        }
      else {
        console.log("faild");

      }
    });
    this.brundService.getBrands()
      .subscribe(success => {
        if (success) {
          this.brands = success;
          this.getBrandName();
        }
        else {
          console.log("faild");

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
        });
      },

      height: '170',
      width: '100%',

    });
  }


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

  UpdateProduct() {
    this.prod.description =tinymce.activeEditor.getContent();
    if(this.prod.quantity<this.prod.qnt_sold)
    {
      this.error="La quantité totale doit être supérieure à Quantité vendue.";

    }
    else
    if(this.prod.old_price<this.prod.price)
    {
      this.error="Le prix avant promotion doit être inférieur ou égale (pas de promotion) au prix.";
    }
    else{
      var s=[];
    for(var i=0;i<this.prod.size.length;i++)
     { if(this.prod.size[i].size!=null)
       s.push(this.prod.size[i].size)
       else
       s.push(this.prod.size[i])
    }

    this.prod.size=s;
    console.log(this.prod);
    {this.productService.UpdateProduct(this.prod,this.image,this.deleteImage)
      .subscribe(success => {
        if (success) {

          this.router.navigateByUrl('/products/ListProductsComponent',{skipLocationChange:true}).then(()=>{
            this.router.navigate(['/pages/products']);})
            

          this.showToast();        
          }
        else {
        this.error="Une erreur s'est produite. Veuillez réessayer"
        }
      });}}
  }
  resetImage() {
    this.deleteImage=true;
    this.prod.prod_image = [];
    this.image = [];

  }
  showToast() {
    this.alertService.showToast("Produit modifier avec succès")

  }
  checkPromo()
  {
     this.prod.old_price=this.prod.price;
  }
  validatedate()
  {
    
    if (this.currentDate.getTime() <=new Date(this.prod.exp_date).getTime())
    return true;
  return false;
  }
}