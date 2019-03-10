import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RegisterSellersPageUpdate } from './registersellers_update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterSellersPageUpdate
      }
    ])
  ],
  declarations: [RegisterSellersPageUpdate]
})
export class RegisterSellersPageUpdateModule {}
