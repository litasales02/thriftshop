import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';
import { AlertController, ToastController  } from '@ionic/angular';
import * as firebase from 'firebase';

const configfirebase = {
  apiKey: 'AIzaSyBjLH-kuTHlEudLkd0QTuO5r8Eu1CoY2As',
  authDomain: 'thriffshop.firebaseapp.com',
  databaseURL: 'https://thriffshop.firebaseio.com',
  projectId: 'thriffshop',
  storageBucket: 'thriffshop.appspot.com'
};
firebase.initializeApp(configfirebase); 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  drawerTitle: string = "Hi Guest!";
  loginStatus: boolean = false;
  username: '';
  fullname: '';
  public appPage =[];
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Maps',
      url: '/maps',
      icon: 'map'
    },
    {
      title: 'Shop List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'chatboxes'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'person-add'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];
 
  constructor(
    public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) {
    console.log('call app.componen.ts');
    this.initializeApp(); 
  }
  async login(username,password ,callback){
    return await this.authen(username,password,function(obj){
      callback(obj);
    });
  }
  async authen(username,password,callback){
    var self = this;
    let getlogin = firebase.database().ref('maindata').orderByChild('username').equalTo(username);
    getlogin.once('value',function(childs){
      let data = childs.val();
      if (data) {
        childs.forEach(function(data){
          if ( data.val().password === password ){
            self.drawerTitle = 'Hi ' + data.val().firstname;
            self.loginStatus = true;
            callback(true);
          } else {
            callback(false);
            self.loginStatus = false;
          }
        });
      } else {
        self.loginStatus = false;
        callback(false);
      }
    }); 
  }
  async alerts(title,header,buttons) { 
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: header,
      buttons: buttons
    });
    await alert.present();
  }
  async ShowToast(message,timeout = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: timeout
    });
    toast.present();
  }
  async menuRouting(link){
    this.router.navigate(['/home']);
  }
  async newdata(value){
    let newInfo = firebase.database().ref('maindata').push();
    await newInfo.set(value);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({ 
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC3qWP8UR4km33e7L7Pj3cUut5kRCWfevU',
        'API_KEY_FOR_BROWSER_DEBUG': ''
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });    
    // firebase.initializeApp(configfirebase);
  }
}
