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
    path: 'list/storedetails',
    loadChildren: './storedetails/storedetails.module#StoreDetailsPageModule'
  },
  {
    path: 'messages',
    loadChildren: './messages/messages.module#MessagesPageModule'
  },
  {
    path: 'register',
    loadChildren: './register_buyer/register.module#RegisterPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'accountsetting',
    loadChildren: './accountsetting/accountsetting.module#AccountSettingPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
