
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BrandService } from '../../../../services/brand.service'
import { Brand } from '../../../../model/Brand';
import { config } from '../../../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['../../list-products/list-products.component.scss']
})
export class ListBrandsComponent implements OnInit {

  brands = []
  constructor(private brandService: BrandService, private router: Router) {

  }

  ngOnInit(): void {
    this.brandService.getBrands()
      .subscribe(success => {
        if (success != null) {
          this.brands = success;
          console.log(this.brands)
        }
        else {
          console.log("faild...");

        }
      });
  }

  settings = {

    add: "",
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete:
    {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      custom: [{
        title: '<i class="nb-arrow-dropright"></i>',
        type: 'html',


      },
      ]
    } ,
    columns: {
      brand_image: {
        title: 'Image',
        type: 'html',
        editable: false,
        addable: false,
        valuePrepareFunction: (brand_image) => { console.log(config.imgUrl + brand_image); return `<img width="60px" src="${config.imgUrl + brand_image}" />`; },
      },
      id: {
        title: '#Référence',
        type: 'number',
        editable: false,
        addable: false,
      },

      brand_name: {
        title: 'Nom de marque',
        type: 'string',

      },
    },

    mode: 'inline',
  };
  public input: string = '<input  type="checkbox"></input>';
  source: LocalDataSource = new LocalDataSource();
  data = [
    {
      picture: "assets/images/p1.webp",
      id: 1,
      productName: "Bret",
      quantity: 20,
      price: 25.5,
      type: "Nouveau"

    },

  ];

 onDeleteConfirm(event): void {
    if (window.confirm('Attention! Cette tache entraîne la suppression de tous les produits appartenant à cette marque. Etes-vous sûr que vous voulez supprimer cette marque? ')) {
      event.confirm.resolve();
      this.brandService.DeleteBrand(event.data.id)
        .subscribe(success => {
          if (success) {
            console.log(success);
            event.confirm.resolve(event.source.data);
          }
          else {
            this.errors.push("Une erreur s'est produite. Veuillez réessayer");
          }
        }
        )
    }
    else {
      event.confirm.reject();
    }


  }
  onCustom(event) {
    console.log(event.data.id)
    this.router.navigate(['/pages/products/brand/update-brand/' + event.data.id]);
  }
  errors = [];
  
  updateRecord(event) {
    this.errors = [];
    var brand = new Brand();
    brand.id = event.newData.id;
    brand.brand_name = event.newData.brand_name;

    if (brand.brand_name == "")
      this.errors.push("Invalide champ: Nom de marque  .");

    if (this.errors.length == 0) {
      this.brandService.UpdateBrandList(brand)
        .subscribe(success => {
          if (success) {
            event.confirm.resolve(event.newData);
          }
          else {

            this.errors.push("Une erreur s'est produite. Veuillez réessayer");
          }
        }
        )
    }
  }

}
