import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';
import { AlertController, ToastController, LoadingController   } from '@ionic/angular';
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
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  drawerTitle: string = "Hi Guest!";
  loginStatus: boolean = false;
  userid: string = '';
  userType: string = '';
  username: '';
  fullname: ''; 
  profileimg = '/assets/store.png';
  storedata = [];
  storedata2 = [];
  productdata = [];
  productdatafavorite = [];
  favoritecount = 0;
  starscss = 'drawerrate hide';
  isMD = this.platform.is('android');
  stars = 0;
  kanoevaluation = {total_stars:0};
  ref = firebase.database().ref('maindata').orderByChild('userdetails');
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
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { 
    this.ref.on('value',resp =>{
      this.storedata = [];
      this.storedata = snapshotToArray(resp);
    });
    this.initializeApp(); 
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  logout(){    
    this.starscss = 'drawerrate hide';
    this.drawerTitle = 'Hi Guest!';
    this.profileimg = '/assets/store.png';
    this.loginStatus = false;
    this.username = '';
    this.fullname = '';
    this.userid = '';
    this.router.navigate(['/home']);
    this.ShowToast('Logging Out Good Bye!');
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
            self.userid = data.key;
            self.drawerTitle = data.val().userdetails.firstname;
            self.loginStatus = true;
            self.profileimg = data.val().userdetails.profileimg;
            self.userType =  data.val().usertype;
            self.starscss = 'drawerrate show';
            self.kanoevaluation = self.kanoalgoset(data.val().feedsseller);
            self.stars =  self.kanoevaluation.total_stars;//Array(self.kanoevaluation.total_stars).map((x,i)=>i);
            self.updatedataset(data.key,{
              totalStars: self.kanoevaluation.total_stars
            });            
            self.loadfavorite();
            console.log(self.productdatafavorite);
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
    this.router.navigate([link]);
  }
  getstorebyname(productname,callback){
    console.clear();
    var self = this;
    self.storedata2 = [];
    this.storedata.forEach(function(element,index,arr){
      if(typeof(element.usertype) != 'undefined'){
        // Object.entries(element).forEach(function(element2,index,arr){
          var storename = String(JSON.stringify(element.storename)).toLowerCase();
          if(typeof(storename) != "undefined" && storename.indexOf(productname.toLowerCase()) > -1){
            // console.log(element);
          //   console.log(element2[1]['productname']);
            let item = element;
            item.key = element.key; 
          //   // item.push(element2[1]);
          //   console.log(item);
            self.storedata2.push(item);
          }
        // });
      }
      if(index == arr.length - 1){ 
        callback(self.storedata2);
      }
    });
  }
  getproductsbyname(productname){
    // console.clear();
    var self = this;
    self.productdata = [];
    this.storedata.forEach(element => {
      if(typeof(element.product) != 'undefined'){
        Object.entries(element.product).forEach(function(element2,index,arr){
          if(element2[1]['productname'].toLowerCase().indexOf(productname.toLowerCase()) > -1){
            // console.log(element2[1]['productname']);
            let item = Object.assign({}, element2)[1];
            item['key'] = Object.assign({}, element2)[0]; 
            // item.push(element2[1]);
            // console.log(item);
            self.productdata.push(item);
          }
        });
      }
    });
  }
  getproductsbyfilter(filers,productname){
    console.clear();
    var self = this;
    self.productdata = [];
    // console.log('filtered')
    this.storedata.forEach(element => {
      if(typeof(element.product) != 'undefined'){
        Object.entries(element.product).forEach(function(element2,index,arr){
          if(element2[1]['productname'].toLowerCase().indexOf(productname.toLowerCase()) > -1 && element2[1]['producttype'].toLowerCase() == filers.toLowerCase()){
            // console.log(element2[1]['productname']);
            let item = Object.assign({}, element2)[1];
            item['key'] = Object.assign({}, element2)[0]; 
            // item.push(element2[1]);
            // console.log(item);
            self.productdata.push(item);
          }
        });
      }
    });
  }
  getproducts(key){
    let newInfo = firebase.database().ref('maindata/'+key).child('product').orderByKey();
    newInfo.on('value',childSnapshot => { 
      this.productdata = [];
      this.productdata = snapshotToArrayproduct(childSnapshot);
    });
  }
  getproductsall(){ 
    this.productdata = [];
    let newInfo = firebase.database().ref('maindata').orderByKey();
    newInfo.on('value',childSnapshot => {
      childSnapshot.forEach(childs => {
        var d = childs.val(); 
        if( d.usertype == 'seller'){        
          childs.forEach(element => {  
            if (element.key == "product") {
              element.forEach(element2 => {
                let item = element2.val();
                item.key = element2.key; 
                this.productdata.push(item);
              });
            }
          });
         }        
      });
    });
    // console.log(this.productdata);
  }
  getfravorites(productkey){
    var self = this;  
    var results = this.productdatafavorite.find(function(element) { 
      return productkey == element.pID; 
    });  
    if (typeof(results) != 'undefined' && results.pID == productkey){
      return true;
    }else{
      return false; 
    } 
  }
  loadfavorite(){
    var self = this;
    this.productdatafavorite = [];
    this.favoritecount = 0;
    // console.log('this.storedata',this.storedata);
    this.storedata.forEach(function(element ,index1,arr1) {     
      if(typeof(element.favorites) != 'undefined' && element.key == self.userid){
        // console.log("element",element);
        Object.entries(element.favorites).forEach(function(element2,index,arr){  
          // console.log('element20',element2[0]);  
          // console.log('element21',element2[1]); 
          // console.log('arr',arr); 
          self.favoritecount++;
          let d = {key : element2[0], pID : element2[1]['key']};
          // d.key = element2[0];
          // console.log('d',d);
          self.productdatafavorite.push(d);
        });
      }
    });
  }
  async newdata(value){
    let newInfo = firebase.database().ref('maindata').push();
    await newInfo.set(value);
  }
  async updatedata(value){
    await firebase.database().ref('maindata/'+this.userid).update(value);
  }
  async updatedataset(userid,value){
    await firebase.database().ref('maindata/'+userid).update(value);
  }
  async updatenewproduct(value){
    let newproduct =  firebase.database().ref('maindata/'+ this.userid + '/product').push();
    await newproduct.set(value);
  }  
  async updatefavorateproduct(key){
    var resultskey = this.productdatafavorite.find(function(element) {  
      return key == element.pID; 
    }); 
    if(typeof(resultskey) != 'undefined' && resultskey.pID == key){
      console.log("tawag ng tangalan");
      firebase.database().ref('maindata/'+ this.userid + '/favorites/'+resultskey.key).remove();
    }else{
      console.log("tawag ng duggag");
      let newproduct = firebase.database().ref('maindata/'+ this.userid + '/favorites/').push();
      await newproduct.set({'key':key});
    }
    this.loadfavorite();
  }  
  async updatenewkanodata(id,value){
    // let newproduct =  
    await firebase.database().ref('maindata/'+ id + '/feedsseller/'+this.userid+"/").update(value);
    // await newproduct.set(value);
  }
  kanoalgoset(feedsseller){
    var self = this;
    var total_rate = 0;
    var total_final = 0;  
    var total_stars = 0;
    var total_excellent = 0;
    var total_average = 0;
    var total_good = 0;
    var total_bad = 0;
    var total_poor = 0;
    var users = 0;
    
    var total_excellentp = 0;
    var total_averagep = 0;
    var total_goodp = 0;
    var total_badp = 0;
    var total_poorp = 0; 
  // -LXAsHXXhdBTaTXxh3Xp
  // 1.	It is excellent = e
  // 2.	It is good = g
  // 3.	It is average = a
  // 4.	It is bad = b
  // 5.	It is poor = p 
 
      if(typeof(feedsseller) != 'undefined'){
        Object.values(feedsseller).forEach(function(element2,index,arr){  
            // console.log('Q1P1',element2['Q1P1']);
            // console.log('Q1P2',element2['Q1P2']);
            // console.log('Q2P1',element2['Q2P1']);
            // console.log('Q2P2',element2['Q2P2']);
            // console.log('Q3P1',element2['Q3P1']);
            // console.log('Q3P2',element2['Q3P2']); 
            total_rate = 0;
            users++;
            total_rate = total_rate + self.kanu_evalletters(element2['Q1P1']);
            total_rate = total_rate + self.kanu_evalletters(element2['Q1P2']);
            total_rate = total_rate + self.kanu_evalletters(element2['Q2P1']);
            total_rate = total_rate + self.kanu_evalletters(element2['Q2P2']);
            total_rate = total_rate + self.kanu_evalletters(element2['Q3P1']);
            total_rate = total_rate + self.kanu_evalletters(element2['Q3P2']);
           
            total_rate = total_rate / 5;
            total_final = total_final + total_rate;
            // console.log('total_rate',total_rate);
            // Object.keys(element2).forEach(elementkey => {
            //   // console.log('element2' ,element2[elementkey]);
            //   if (self.kanu_evalletters(element2[elementkey]) == 5 ){
            //     total_excellent++;
            //   } else if(self.kanu_evalletters(element2[elementkey]) == 4 ){
            //     total_average++;
            //   } else if(self.kanu_evalletters(element2[elementkey]) == 3 ){
            //     total_good++;
            //   } else if(self.kanu_evalletters(element2[elementkey]) == 2 ){
            //     total_bad++;
            //   } else if(self.kanu_evalletters(element2[elementkey]) == 1 ){
            //     total_poor++;
            //   }
            // });
            switch(total_rate){
              case 5:
                total_excellent++;
                break;
              case 4:
                total_average++;
                break;
              case 3:
                total_good++;
                break;
              case 2:
                total_bad++;
                break;
              case 1:
                total_poor++;
                break;
            }
            
            if(index == arr.length - 1){ 
              total_stars = ((total_final / arr.length) | 0);

              total_excellentp = (isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0);
              total_averagep = (isFinite((100 / users) * total_average)?((100 / users) * total_average):0);
              total_goodp = (isFinite((100 / users) * total_good)?((100 / users) * total_good):0);
              total_badp = (isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0);
              total_poorp = (isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0);
              
            }
        });
    }
    return {
      'total_users':users,
      'total_stars': total_stars,
      'total_excellent': total_excellent,
      'total_average': total_average,
      'total_good': total_good,
      'total_bad': total_bad,
      'total_poor': total_poor,
      'total_excellentp': total_excellentp,
      'total_averagep': total_averagep,
      'total_goodp': total_goodp,
      'total_badp': total_badp,
      'total_poorp': total_poorp
    }
  }
  kanoalgo(key){
    var self = this;
    var users = 0;
    var total_rate = 0;
    var total_final = 0;  
    var total_stars = 0;
    var total_excellent = 0;
    var total_average = 0;
    var total_good = 0;
    var total_bad = 0;
    var total_poor = 0; 
    
    var total_excellentp = 0;
    var total_averagep = 0;
    var total_goodp = 0;
    var total_badp = 0;
    var total_poorp = 0; 
  // -LXAsHXXhdBTaTXxh3Xp
  // 1.	It is excellent = e
  // 2.	It is good = g
  // 3.	It is average = a
  // 4.	It is bad = b
  // 5.	It is poor = p 
  this.storedata.forEach(function(element ,index1,arr1) {   
      // console.log(element);
      if(typeof(element.feedsseller) != 'undefined' && element.key == key){
        Object.values(element.feedsseller).forEach(function(element2,index,arr){  
            // console.log('Q1P1',element2['Q1P1']);
            // console.log('Q1P2',element2['Q1P2']);
            // console.log('Q2P1',element2['Q2P1']);
            // console.log('Q2P2',element2['Q2P2']);
            // console.log('Q3P1',element2['Q3P1']);
            // console.log('Q3P2',element2['Q3P2']); 
            users++;
            total_rate = 0;
            
            total_rate = total_rate + self.kanu_evalletters(element2['Q1P1']);
            // console.log('Q1P1',total_rate);
            total_rate = total_rate + self.kanu_evalletters(element2['Q1P2']);
            // console.log('Q1P2',total_rate);
            total_rate = total_rate + self.kanu_evalletters(element2['Q2P1']);
            // console.log('Q2P1',total_rate);
            total_rate = total_rate + self.kanu_evalletters(element2['Q2P2']);
            // console.log('Q2P2',total_rate);
            total_rate = total_rate + self.kanu_evalletters(element2['Q3P1']);
            // console.log('Q3P1',total_rate);
            total_rate = total_rate + self.kanu_evalletters(element2['Q3P2']);
            // console.log('Q3P2',total_rate);
           
            total_rate = total_rate / 6;
            total_final = total_final + total_rate;
            // console.log('total_rate',total_rate);
            // console.log('total_final',total_final);

            switch(total_rate | 0){
              case 5:
                total_excellent++;
                break;
              case 4:
                total_average++;
                break;
              case 3:
                total_good++;
                break;
              case 2:
                total_bad++;
                break;
              case 1:
                total_poor++;
                break;
            }

            // console.log('index',index);
            // console.log('arr.length',arr.length);
            if(index == arr.length - 1){ 
              total_stars = ((total_final / users) | 0);

              // console.log('users',users);  
              // console.log('total_excellent',total_excellent,(isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0));  
              // console.log('total_average',total_average,(isFinite((100 / users) * total_average)?((100 / users) * total_average):0));  
              // console.log('total_good',total_good,(isFinite((100 / users) * total_good)?((100 / users) * total_good):0));  
              // console.log('total_bad',total_bad, (isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0));  
              // console.log('total_poor',total_poor, (isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0));  

              total_excellentp = (isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0);
              total_averagep = (isFinite((100 / users) * total_average)?((100 / users) * total_average):0);
              total_goodp = (isFinite((100 / users) * total_good)?((100 / users) * total_good):0);
              total_badp = (isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0);
              total_poorp = (isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0);
              
            }
        });
      }
      // if(index1 == arr1.length - 1){                      
      //   self.updatedataset(key,{
      //     totalStars: total_stars
      //   })
      // }
    });
    return {
      'total_users':users,
      'total_stars': total_stars,
      'total_excellent': total_excellent,
      'total_average': total_average,
      'total_good': total_good,
      'total_bad': total_bad,
      'total_poor': total_poor,
      'total_excellentp': total_excellentp,
      'total_averagep': total_averagep,
      'total_goodp': total_goodp,
      'total_badp': total_badp,
      'total_poorp': total_poorp
    }
  }
  kanu_evalletters(val){
    if (val == 'e'){ // 1.	It is excellent = e
      return 5;
    } else if(val == 'g') { // 2.	It is good = g
      return 4;
    } else if(val == 'a') { // 3.	It is average = a
      return 3;
    } else if(val == 'b') { // 4.	It is bad = b
      return 2;
    } else if(val == 'p') { // 5.	It is poor = p
      return 1;
    }else {
      return 0
    }
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
export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      // console.log("data " , item);
      // console.log("data 2 " , childSnapshot.val());
      returnArr.push(item);
  });
  return returnArr;
};
export const snapshotToArrayproduct = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      // console.log("data " , item);
      returnArr.push(item);
  });
  return returnArr;
};
export const snapshotToArrayproductnested = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      // console.log("data " , childSnapshot);
      // console.log("data 1" , item);
      // console.log("data 2 " , childSnapshot.key);
      // item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};
