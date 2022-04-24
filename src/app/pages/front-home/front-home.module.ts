import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontHomeComponent } from '../front-home/front-home.component';

import { NbCardModule, NbInputModule, NbTreeGridModule, NbIconModule,NbAlertModule} from '@nebular/theme';
import { UpdateBasicsComponent } from './update-basics/update-basics.component';
import { FrontHomeRoutingModule } from './front-home-routing.module';
import { UpdateComponent } from './update/update.component';
import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule, 
    NbTreeGridModule,
    NbAlertModule,
    FrontHomeRoutingModule,
    NbTreeGridModule,
    ThemeModule,
    CKEditorModule ,
    NbCardModule,
    FormsModule,
    RouterModule,
    NbIconModule,

  ],
  declarations: [ 
    FrontHomeComponent, 
    UpdateBasicsComponent, 
    UpdateComponent],

})
export class FrontHomeModule { }
