import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { CommonModule } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Firebase } from '@ionic-native/firebase/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
const firebaseCredential = {
  apiKey: "AIzaSyAKTcDsFQf33AmoNOVJbl0RtLtFM-kD6DM",
  authDomain: "thrftshp.firebaseapp.com",
  databaseURL: "https://thrftshp.firebaseio.com",
  projectId: "thrftshp",
  storageBucket: "thrftshp.appspot.com",
  messagingSenderId: "171453440603"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(firebaseCredential),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
