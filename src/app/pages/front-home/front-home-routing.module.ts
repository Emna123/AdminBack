import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { FrontHomeComponent } from './front-home.component';
import { UpdateBasicsComponent } from './update-basics/update-basics.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [{
  path: '',
  component: FrontHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'update',
      pathMatch: 'full',
    },
    {
      path: 'update',
      component: UpdateComponent,
    },
    {
      path: 'update-basics',
      component: UpdateBasicsComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontHomeRoutingModule { }
