


import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../../../services/product.service'
import { Product } from '../../../model/Product';
import { config } from '../../../config';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products = []
  constructor(private productService: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    var product = new Product();
    console.log("hello")
    this.productService.getProducts()
      .subscribe(success => {
        if (success != null) {
          this.products = success;
        }
        else {
          console.log("famamochkil");

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
      },]
    },
    columns: {
      prod_image: {
        title: 'Image',
        type: 'html',
        editable: false,
        addable: false,
        valuePrepareFunction: (prod_image) => { console.log(config.imgUrl, prod_image[0]); return `<img width="60px" src="${config.imgUrl}${prod_image[0].name}" />`; },
      },
      id: {
        title: '#Référence',
        type: 'number',
        editable: false,
        addable: false,
      },
      productName: {
        title: 'Libellé',
        type: 'string',
      },
      price: {
        title: 'Prix(DT)',
        type: 'number',
      },
      old_price: {
        title: 'prix avant remise(DT)',
        type: 'number',
      },
      quantity: {
        title: 'Quantité',
        type: 'number',

      },
      qnt_sold: {
        title: 'Quantité vendue',
        type: 'number',

      },
      new_prod: {
        title: 'Nouveau Oui/Non',
        type: 'string',

      },
      best_prod: {
        title: 'Meilleur Oui/Non',
        type: 'boolean',
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
    console.log(event.data.id);
    if (window.confirm('Etes-vous sûr que vous voulez supprimer ce produit?')) {
      event.confirm.resolve();
      this.productService.DeleteProduct(event.data.id)
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
    this.router.navigate(['/pages/products/update-product/' + event.data.id]);
  }
  errors = [];
  updateRecord(event) {
    this.errors = [];
    var product = new Product();
    product.id = event.newData.id;
    product.productName = event.newData.productName;
    product.price = event.newData.price;
    product.old_price = event.newData.old_price;
    product.quantity = event.newData.quantity;
    product.size=[];
    product.qnt_sold = event.newData.qnt_sold;
    if (event.newData.new_prod.toUpperCase() == "NON")
      product.new_prod = false;
    else
      product.new_prod = true;
    if (event.newData.best_prod.toUpperCase() == "NON")
      product.best_prod = false;
    else
      product.best_prod = true;

    if (product.productName == "")
      this.errors.push("Invalide champ: Libellé .");
    if (product.price <= 0 || isNaN(Number(product.price)))
      this.errors.push("Invalide champ: Prix.");
    if (product.old_price < 0 || isNaN(Number(product.old_price)) || product.old_price < product.price)
      this.errors.push("Invalide champ: Prix avant remise .");
    if (product.quantity < 0 || isNaN(Number(product.quantity)))
      this.errors.push("Invalide champ: Quantité.");
    if (product.qnt_sold < 0 || isNaN(Number(product.qnt_sold)))
      this.errors.push("Invalide champ: Quantité vendue.");
    if (event.newData.best_prod.toUpperCase() != "NON" && event.newData.best_prod.toUpperCase() != "OUI" || event.newData.best_prod == "")
      this.errors.push("Invalide champ: Meilleur (valeur: Oui/Non).")
    if (event.newData.new_prod.toUpperCase() != "NON" && event.newData.new_prod.toUpperCase() != "OUI" || event.newData.new_prod.toUpperCase() == "")
      this.errors.push("Invalide champ: Nouveau (valeur: Oui/Non).")
      console.log(product)
    if (this.errors.length == 0) {
      this.productService.UpdateProductList(product)
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