import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddbrandComponent } from './brand/add-brand/add-brand.component';
import { ListBrandsComponent } from './brand/list-brands/list-brands.component'
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateBrandComponent } from './brand/update-brand/update-brand.component';
const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: '',
      redirectTo: 'list-products',
      pathMatch: 'full',
    },
    {
      path: 'list-products',
      component: ListProductsComponent,

    },

    {
      path: 'add-product',
      component: AddProductComponent,

    },
    {
      path: 'brand/add-brand',
      component: AddbrandComponent,

    },
    {
      path: 'brand/list-brands',
      component: ListBrandsComponent,

    },
    {
      path: 'brand/update-brand/:id',
      component: UpdateBrandComponent,

    },
    {
      path: 'update-product/:id',
      component: UpdateProductComponent,
    },

    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {
}
