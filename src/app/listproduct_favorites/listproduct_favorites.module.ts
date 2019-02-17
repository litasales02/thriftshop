import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListProduct_FavoritePage } from './listproduct_favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListProduct_FavoritePage
      }
    ])
  ],
  declarations: [ListProduct_FavoritePage]
})
export class ListProduct_FavoritePageModule {}
