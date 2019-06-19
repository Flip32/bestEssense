import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopoverPage } from './popover.page';
import {FormularioPageModule} from '../formulario/formulario.module';

const routes: Routes = [
  {
    path: '',
    component: PopoverPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        FormularioPageModule,
        ReactiveFormsModule
    ],
  declarations: [PopoverPage]
})
export class PopoverPageModule {}
