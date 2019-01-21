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
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'list/storedetails/:id/:child',
    loadChildren: './storedetails/storedetails.module#StoreDetailsPageModule'
  },
  {
    path: 'messages',
    loadChildren: './messages/messages.module#MessagesPageModule'
  },
  {
    path: 'register',
    loadChildren: './registration_select/registration_select.module#Registration_SelectPageModule'
  },
  {
    path: 'register/buyer',
    loadChildren: './registerbuyer/registerbuyer.module#RegisterBuyerPageModule'
  },
  {
    path: 'register/seller',
    loadChildren: './registersellers/registersellers.module#RegisterSellersPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
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
    path: 'product/list',
    loadChildren: './listproduct/listproduct.module#ListProductPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
