import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsPageModule'
  },
  {
<<<<<<< HEAD
=======
    path: 'questioner/:id',
    loadChildren: './questioner/questioner.module#QuestionerPageModule'
  },
  {
>>>>>>> develop
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
<<<<<<< HEAD
=======
    path: 'list/storedetails/:id/:child',
    loadChildren: './storedetails/storedetails.module#StoreDetailsPageModule'
  },
  {
>>>>>>> develop
    path: 'messages',
    loadChildren: './messages/messages.module#MessagesPageModule'
  },
  {
    path: 'register',
<<<<<<< HEAD
    loadChildren: './register/register.module#RegisterPageModule'
=======
    loadChildren: './registration_select/registration_select.module#Registration_SelectPageModule'
  },
  {
    path: 'register/buyer',
    loadChildren: './registerbuyer/registerbuyer.module#RegisterBuyerPageModule'
  },
  {
    path: 'register/seller',
    loadChildren: './registersellers/registersellers.module#RegisterSellersPageModule'
>>>>>>> develop
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
<<<<<<< HEAD
=======
  },
  {
    path: 'accountsetting',
    loadChildren: './accountsetting/accountsetting.module#AccountSettingPageModule'
  },
  {
    path: 'createproduct',
    loadChildren: './createproduct/createproduct.module#CreateProductPageModule'
  },
  {
    path: 'product/list/:id/:child',
    loadChildren: './listproduct/listproduct.module#ListProductPageModule'
  },
  {
    path: 'favorites/products',
    loadChildren: './listproduct_favorites/listproduct_favorites.module#ListProduct_FavoritePageModule'
  },
  {
    path: 'products/details/:id',
    loadChildren: './productdetails/productdetails.module#ProductDetailsPageModule'
  },
  {
    path: 'setstoremap',
    loadChildren: './setstoremap/setstoremap.module#SetStoreMapPageModule'
>>>>>>> develop
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
