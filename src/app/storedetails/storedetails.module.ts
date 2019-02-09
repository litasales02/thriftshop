import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {ProgressBarModule} from "angular-progress-bar"

import { StoreDetailsPage } from './storedetails.page';

@NgModule({
  imports: [
    ProgressBarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: StoreDetailsPage
      }
    ])
  ],
  declarations: [StoreDetailsPage]
})
export class StoreDetailsPageModule {}
