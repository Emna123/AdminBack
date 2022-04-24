
import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbSelectModule,    NbCheckboxModule,NbAlertModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule} from '../../@theme/theme.module';
import {ProductsComponent} from '../products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import {ProductRoutingModule} from './product-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { AddbrandComponent } from './brand/add-brand/add-brand.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListBrandsComponent } from './brand/list-brands/list-brands.component';
import { UpdateBrandComponent } from './brand/update-brand/update-brand.component';

@NgModule({
  imports: [
    ProductRoutingModule,
    NbSelectModule,
    NgSelectModule, 
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CKEditorModule ,
    Ng2SmartTableModule,
    NbCardModule,
    FormsModule,
    NbAlertModule,
    NbCheckboxModule,
  ],
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ListProductsComponent,
    AddbrandComponent,
    UpdateProductComponent,
    ListBrandsComponent,
    UpdateBrandComponent,
  ],
})
export class ProductsModule { }

