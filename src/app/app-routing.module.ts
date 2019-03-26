import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'maps',
    canActivate: [AuthGuard],
    loadChildren: './maps/maps.module#MapsPageModule'
  },
  {
    path: 'questioner/:id',
    canActivate: [AuthGuard],
    loadChildren: './questioner/questioner.module#QuestionerPageModule'
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'list/storedetails/:id/:child',
    loadChildren: './storedetails/storedetails.module#StoreDetailsPageModule'
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: './messages/messages.module#MessagesPageModule'
  },
  {
    path: 'review/ratings/:id',
    canActivate: [AuthGuard],
    loadChildren: './revieweratings/revieweratings.module#RevieweRatingsPageModule'
  },
  {
    path: 'message/panel/:id/:child',
    canActivate: [AuthGuard],
    loadChildren: './message_panel/message_panel.module#Messages_panelPageModule'
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: './registration_select/registration_select.module#Registration_SelectPageModule'
  },
  {
    path: 'register/buyer',
    canActivate: [AuthGuard],
    loadChildren: './registerbuyer/registerbuyer.module#RegisterBuyerPageModule'
  },
  {
    path: 'register/buyer/update',
    canActivate: [AuthGuard],
    loadChildren: './registerbuyerupdate/registerbuyerupdate.module#RegisterBuyerUpdatePageModule'
  },
  {
    path: 'register/seller',
    canActivate: [AuthGuard],
    loadChildren: './registersellers/registersellers.module#RegisterSellersPageModule'
  },
  {
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'accountsetting',
    canActivate: [AuthGuard],
    loadChildren: './accountsetting/accountsetting.module#AccountSettingPageModule'
  },
  {
    path: 'accountsettingbuyer',
    canActivate: [AuthGuard],
    loadChildren: './accountsettingbuyer/accountsettingbuyer.module#AccountSettingBuyerPageModule'
  },
  {
    path: 'accountsettinggeneralseller',
    canActivate: [AuthGuard],
    loadChildren: './registersellers_update/registersellers_update.module#RegisterSellersPageUpdateModule'
  },
  {
    path: 'createproduct',
    canActivate: [AuthGuard],
    loadChildren: './createproduct/createproduct.module#CreateProductPageModule'
  },
  {
    path: 'product/list/:id/:child',
    canActivate: [AuthGuard],
    loadChildren: './listproduct/listproduct.module#ListProductPageModule'
  },
  {
    path: 'favorites/products',
    canActivate: [AuthGuard],
    loadChildren: './listproduct_favorites/listproduct_favorites.module#ListProduct_FavoritePageModule'
  },
  {
    path: 'products/details/:id',
    canActivate: [AuthGuard],
    loadChildren: './productdetails/productdetails.module#ProductDetailsPageModule'
  },
  {
    path: 'products/edit/:id',
    canActivate: [AuthGuard],
    loadChildren: './updateproduct/updateproduct.module#UpdateProductPageModule'
  },
  {
    path: 'products/details/:id/:child',
    canActivate: [AuthGuard],
    loadChildren: './productdetails/productdetails.module#ProductDetailsPageModule'
  },
  {
    path: 'setstoremap',
    canActivate: [AuthGuard],
    loadChildren: './setstoremap/setstoremap.module#SetStoreMapPageModule'
  },
  {
    path: 'storemap/:id',
    canActivate: [AuthGuard],
    loadChildren: './storemap/storemap.module#StoreMapPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
