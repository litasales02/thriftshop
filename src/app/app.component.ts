import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';
import { AlertController, ToastController, LoadingController   } from '@ionic/angular';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  registrationstatus = 0;
  userid: string = '';
  userType: string = '';
  username: '';
  fullname: ''; 
  profileimg = '/assets/store.png';
  storedata = [];
  storedata2 = [];
  productdata = [];
  sellergeodata = [];
  productdatafavorite = [];
  usermessage = [];
  usermessagepanel = [];
  requirementsdata = {
    'status': 0,
    'idtype':null,
    'govid': null,
    'storeimg': null
  };
  storemapstatus = 'None';
  geodatastatus = 'None';
  geodata = 0;
  geolat = 0.0;
  geolong = 0.0;
  setgeolat = 0.0;
  setgeolong = 0.0;
  geoaccurate = true;
  favoritecount = 0;
  starscss = 'drawerrate hide';
  isMD = this.platform.is('android');
  stars = 0;
  rates = 0;
  kanoevaluation = {total_stars:0};
  watch: any;
  usergeolocationlat = 0;
  usergeolocationlng = 0;
  alert: any;
  maxExtent = [125.2524,6.9946,125.6589,7.5885];
  ref = firebase.database().ref('maindata').orderByChild('userdetails');
 
  selecteditem = "";
  selecteduserkey = "";
  messagechange = false;

  constructor(
    public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen, 
    private statusBar: StatusBar,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private geolocation: Geolocation,
    private fm: FirebaseMessaging ) {
    var self = this;
    this.ref.on('value',resp =>{
      this.storedata = [];
      this.storedata = snapshotToArray(resp);
    });
    this.initializeApp(); 
    this.geolocation.getCurrentPosition().then((resp) => {
      // self.usergeolocationlat = resp.coords.latitude;
      // self.usergeolocationlng = resp.coords.longitude;
      // console.log("resp.coords.latitude",resp.coords.latitude)
      // console.log("resp.coords.longitude",resp.coords.longitude) 
      if((resp.coords.latitude == 0 && resp.coords.longitude == 0) ||       
        ((resp.coords.latitude < 6.9782 || resp.coords.latitude >= 7.5858) &&   
        (resp.coords.longitude < 125.2579 || resp.coords.longitude >= 125.7056))){
        self.usergeolocationlat =  7.148419523108726;
        self.usergeolocationlng =  125.52915832519531;
        // console.log("resp.coords",11);
        self.geoaccurate = false;
      }else{        
        self.usergeolocationlat = resp.coords.latitude;
        self.usergeolocationlng = resp.coords.longitude;
        // console.log("resp.coords",22);
        self.geoaccurate = true;
      }

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     this.watch = this.geolocation.watchPosition();
      this.watch.subscribe((data) => { 
        self.usergeolocationlat = data.coords.latitude;
        self.usergeolocationlng = data.coords.longitude;
        // console.log("data.coords.latitude",data.coords.latitude);
        // console.log("data.coords.longitude",data.coords.longitude);
        if((data.coords.latitude == 0 && data.coords.longitude == 0) ||       
          ((data.coords.latitude <= 6.9782 || data.coords.latitude >=  7.5858) &&   
          (data.coords.longitude <= 125.2579 || data.coords.longitude >= 125.7056))){
          self.geoaccurate = false;
          self.usergeolocationlat =  7.148419523108726;
          self.usergeolocationlng =  125.52915832519531;    
          // console.log("data.coords",1);
        }else{        
          self.usergeolocationlat = data.coords.latitude;
          self.usergeolocationlng = data.coords.longitude;
          // console.log("data.coords",2);
          self.geoaccurate = true;
        }
      });
    //  this.fm.logEvent('page_view', {page: "dashboard"})
    // .then((res: any) => console.log(res))
    // .catch((error: any) => console.error(error));
  }
  maplimitviewgeo(){

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
    // this.storedata = [];
    // this.storedata2 = [];
    this.productdata = [];
    this.sellergeodata = [];
    this.productdatafavorite = [];
    this.usermessage = [];
    this.usermessagepanel = [];
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
            if(data.val().usertype == 'seller'){
              self.geodata =  data.val().geodata.status;
              self.registrationstatus = data.val().requirements.status;
              self.starscss = 'drawerrate show';
              self.kanoevaluation = self.kanoalgoset(data.val().feedsseller);
              self.stars = self.kanoevaluation.total_stars;//Array(self.kanoevaluation.total_stars).map((x,i)=>i);
              self.rates = self.kanoevaluation.total_stars;
              self.updatedataset(data.key,{
                totalStars: self.kanoevaluation.total_stars
              });            
              self.loadfavorite();
              if (typeof(data.val().requirements) != 'undefined'){ 
                self.requirementsdata = data.val().requirements; 
              }
            } else {
              self.registrationstatus = 1; //for buyer
              self.starscss = 'drawerrate hide';
            }
            self.kanoalgo(self.userid);
            self.getmessages();
            self.load_messages();
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
  async alerts2(title,header,buttons) { 
    this.alert = await this.alertCtrl.create({
      header: title,
      subHeader: header,
      buttons: buttons
    });
    await this.alert.present();
  }
  async markeralerts(title,header,buttons) { 
    this.alert = await this.alertCtrl.create({
      header: title,
      subHeader: header,
      buttons: buttons
    });
    await this.alert.present();
    // {
    //   text: 'Cancel',
    //   role: 'cancel',
    //   cssClass: 'secondary',
    //   handler: (blah) => {
    //     console.log('Confirm Cancel: blah');
    //   }
    // }
  }
  async ShowToast(message,timeout = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: timeout,
      position: 'bottom'
    });
    toast.present();
  }
  async menuRouting(link){
    this.router.navigate([link]);
  }
  async getuserlogbyname(username,callback){
    // console.clear();
    var self = this;
    var result = false; 
    this.storedata.forEach(function(element,index,arr){
      if(typeof(element.usertype) != 'undefined'){ 
        if(element.username == username){
          result = true;
        }
      }
    });
    callback(await result)
  }
  mapdata(item){
    var self = this;
    self.sellergeodata = [];
    self.sellergeodata.push(item);
    this.storedata.forEach(function(element,index,arr){
      if(typeof(element.geodata) != 'undefined'){ 
        // console.log(element.geodata.status);
        if(element.usertype == 'seller' && element.geodata.status == 1 && element.key != self.userid){ 
          let item = element.geodata;
          item.position = {"lat": element.geodata.lat,"lng":element.geodata.lng}
          item.key = element.key; 
          item.sellers = 1; 
          item.title = "Store :" + element.storename;
          // console.log(item);
          self.sellergeodata.push(item);
        }
      }
    });
  }
  async getstorebyid(key,callback){
    var self = this;
    var storedata2 = [];
    this.storedata.forEach(function(element,index,arr){
          if(element.key == key ){
            let item = element.userdetails; 
            item.key = element.key; 
            item.utype = element.usertype; 
            storedata2.push(item);
          }
      // if(index == arr.length - 1){ 
      //   callback(storedata2);
      // }
    });
    callback(storedata2);
  }
  getstorebyname(productname,callback){
    // console.clear();
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
    // console.clear();
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
  getmessages(){
    let newInfo = firebase.database().ref('maindata/'+this.userid ).child('messages').orderByKey();
    newInfo.on('child_changed',childSnapshot => {  
      if(this.messagechange == null){
        console.log("load new data");
      }
      var total_change = childSnapshot.numChildren(); 
      var coun_data = 1;
      childSnapshot.forEach(data => { 
        if(total_change <= coun_data ){
          this.usermessage[0].messages.push(data.val());
          this.messagechange = true;
        }
        coun_data++;
      }); 
    });
  }
  getproducts(key){
    let newInfo = firebase.database().ref('maindata/'+key).child('product').orderByKey();
    newInfo.on('value',childSnapshot => { 
      this.productdata = [];
      this.productdata = snapshotToArrayproduct(childSnapshot);
    });
  }
  getproductsbyid(key){ 
    this.productdata = [];
    let newInfo = firebase.database().ref('maindata').orderByKey();
    newInfo.on('value',childSnapshot => {
      childSnapshot.forEach(childs => {
        var d = childs.val();  
        if( d.usertype == 'seller'){        
          childs.forEach(element => {  
            if (element.key == "product") {
              element.forEach(element2 => {
                if(element2.key == key){
                  let item = element2.val();
                  item.key = element2.key;  
                  item.ukey = childs.key;  
                  this.productdata.push(item);
                }
              });
            }
          });
         }        
      });
    });
  }
  async getproductsbyid2(key,callback){ 
    var self = this;
    var productdata = []; 
    this.storedata.forEach(element => {
      if(typeof(element.product) != 'undefined'){
        Object.entries(element.product).forEach(function(element2,index,arr){
          if(element2[0] == key){ 
            let item = Object.assign({}, element2)[1];
            item['key'] = Object.assign({}, element2)[0];  
            item['ukey'] = element.key;  
            productdata.push(item);
          }
        });
      }
    });
    callback(productdata);
  }
  getproductsall(){ 
    this.productdata = [];
    let newInfo = firebase.database().ref('maindata').orderByKey();
    newInfo.on('value',childSnapshot => {
      childSnapshot.forEach(childs => {
        var d = childs.val();  
        if( d.usertype == 'seller' && typeof(d.requirements.status) != 'undefined' && d.requirements.status == 1){        
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
  getproductsallcant(){ 
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
    this.storedata.forEach(function(element ,index1,arr1) {     
      if(typeof(element.favorites) != 'undefined' && element.key == self.userid){ 
        Object.entries(element.favorites).forEach(function(element2,index,arr){   
          self.favoritecount++;
          let d = {key : element2[0], pID : element2[1]['key']}; 
          self.productdatafavorite.push(d);
        });
      }
    });
  }
  async loadfavorite2(keys,cb){
    var self = this;
    var productdatafavorite = [];
    var favoritecount = 0; 
    await this.storedata.forEach(function(element ,index1,arr1) {     
      if(typeof(element.favorites) != 'undefined' && element.key == keys){ 
        Object.entries(element.favorites).forEach(function(element2,index,arr){   
          favoritecount++;
          let d = {key : element2[0], pID : element2[1]['key']}; 
          productdatafavorite.push(d);
        });
      }
    });
    cb(favoritecount);
  }
  load_user_requirements(){ 
    var self = this;
    this.storedata.forEach(element => {
      if(element.key == self.userid){
        if(typeof(element.requirements) != 'undefined'){ 
          self.requirementsdata = element.requirements; 
        }
      }
    });
  }
  load_messages(){// key sa client kong kinsa ang nka contact
    var self = this;
    self.usermessage = [];
    this.storedata.forEach(element => {
      if(element.key == self.userid){
        if(typeof(element.messages) != 'undefined'){  
          Object.entries(element.messages).forEach(element2 => { 
            self.getstorebyid(element2[0],function(rdata){ 
              let msges = [];              
              let item = rdata[0];
              Object.entries(element2[1]).forEach(msg=>{ 
                let mgss = msg[1];
                mgss.key = msg[0];
                msges.push(mgss);
              });
              item.messages = msges;
              item.key = element2[0]; 
              self.usermessage.push(item);
            })
          }); 
        }
      }
    }); 
  }
  async load_messages2(callback){ 
    var self = this;
    self.usermessage = [];
    await this.storedata.forEach(element => {
      if(element.key == self.userid){
        if(typeof(element.messages) != 'undefined'){  
          Object.entries(element.messages).forEach(element2 => { 
            self.getstorebyid(element2[0],function(rdata){ 
              let msges = [];              
              let item = rdata[0];
              Object.entries(element2[1]).forEach(msg=>{ 
                let mgss = msg[1];
                mgss.key = msg[0];
                msges.push(mgss);
              });
              item.messages = msges;
              item.key = element2[0]; 
              self.usermessage.push(item);
            })
          }); 
        }
      }
    });     
    callback(true);
  }
  async usersendmsg(key,message,callbacks){ 
    let newproduct =  firebase.database().ref('maindata/'+ this.userid + '/messages/'+ key).push();
    await newproduct.set({
      'send': message,
      'reply': ''
    });
    let newproduct2 =  firebase.database().ref('maindata/'+ key+ '/messages/'+ this.userid).push();
    await newproduct2.set({
      'send': '',
      'reply': message
    });    
    if(this.usermessage != null && this.usermessage[0] != null && typeof(this.usermessage[0]) != 'undefined'){
      // this.usermessage[0].messages.push({
      //   'send': message,
      //   'reply': ''
      // });   
      console.log("send");
    }else{
      this.getmessages();
      this.load_messages();
    }
    callbacks("done"); 
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
  async updaterequirements(value){
    let newproduct =  firebase.database().ref('maindata/'+ this.userid + '/requirements');
    await newproduct.update(value);
  }  
  async updategeodata(value){
    let newproduct =  firebase.database().ref('maindata/'+ this.userid + '/geodata');
    await newproduct.update(value);
  }  
  async updatefavorateproduct(key){
    var resultskey = this.productdatafavorite.find(function(element) {  
      return key == element.pID; 
    }); 
    if(typeof(resultskey) != 'undefined' && resultskey.pID == key){
      // console.log("tawag ng tangalan");
      firebase.database().ref('maindata/'+ this.userid + '/favorites/'+resultskey.key).remove();
    }else{
      // console.log("tawag ng duggag");
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
    var users = 0;
    var total_rate = 0;
    var total_rate2 = 0;
    var total_final = 0; 
    var total_final2 = 0;  
    var total_stars = 0;
    
    var total_excellent = 0;
    var total_average = 0;
    var total_good = 0;
    var total_bad = 0;
    var total_poor = 0; 
    
    var total_excellent2 = 0;
    var total_average2 = 0;
    var total_good2 = 0;
    var total_bad2 = 0;
    var total_poor2 = 0; 
    
    var total_excellentp = 0;
    var total_averagep = 0;
    var total_goodp = 0;
    var total_badp = 0;
    var total_poorp = 0; 

    var si = 0;
    var di = 0;
  // -LXAsHXXhdBTaTXxh3Xp
  // 1.	It is excellent = e
  // 2.	It is good = g
  // 3.	It is average = a
  // 4.	It is bad = b
  // 5.	It is poor = p 
 
      if(typeof(feedsseller) != 'undefined'){
        Object.values(feedsseller).forEach(function(element2,index,arr){   

            users++;
            total_rate = 0;
            total_rate2 = 0;
            total_rate  = total_rate  + self.kanu_evalletters(element2['Q1P1']);
            total_rate2 = total_rate2 + self.kanu_evalletters(element2['Q1P2']);
            total_rate  = total_rate  + self.kanu_evalletters(element2['Q2P1']);
            total_rate2 = total_rate2 + self.kanu_evalletters(element2['Q2P2']);
            total_rate  = total_rate  + self.kanu_evalletters(element2['Q3P1']);
            total_rate2 = total_rate2 + self.kanu_evalletters(element2['Q3P2']);
           
            total_rate = (total_rate / 3);
            total_rate2 = (total_rate2 / 3); 
            switch(Math.round(total_rate)){
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
            switch(Math.round(total_rate2)){
              case 5:
                total_excellent2++;
                break;
              case 4:
                total_average2++;
                break;
              case 3:
                total_good2++;
                break;
              case 2:
                total_bad2++;
                break;
              case 1:
                total_poor2++;
                break;
            }

            total_final = total_final + total_rate;
            total_final2 = total_final2 + total_rate2;

            if(index == arr.length - 1){ 
 
            // console.log('total_final',(total_final / users));
            // console.log('total_final2',(total_final2 / users));
            // console.log('total_final r',Math.round((total_final / users)));
            // console.log('total_final2 r',Math.round((total_final2 / users)));

            total_final = Math.round((total_final / users));
            total_final2 = Math.round((total_final2 / users));
            // console.log("========================================="); 

            // console.log('total_excellent',total_excellent,Math.round(isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0));  
            // console.log('total_average',total_average,Math.round(isFinite((100 / users) * total_average)?((100 / users) * total_average):0));  
            // console.log('total_good',total_good,Math.round(isFinite((100 / users) * total_good)?((100 / users) * total_good):0));  
            // console.log('total_bad',total_bad, Math.round(isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0));  
            // console.log('total_poor',total_poor,Math.round(isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0));  

            total_excellentp = Math.round(isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0); // p
            total_averagep   = Math.round(isFinite((100 / users) * total_average)?((100 / users) * total_average):0); // m
            total_goodp      = Math.round(isFinite((100 / users) * total_good)?((100 / users) * total_good):0); // a
            total_badp       = Math.round(isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0); // o
            total_poorp      = Math.round(isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0); //  i
    
            // console.log("=========================================");

        //   total_excellentp = (isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0); // p
        //   total_averagep = (isFinite((100 / users) * total_average)?((100 / users) * total_average):0); // m
        //   total_goodp = (isFinite((100 / users) * total_good)?((100 / users) * total_good):0); // a
        //   total_badp = (isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0); // o
        //   total_poorp = (isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0); //  i
            
            // total_stars = total_final; 

            
            // console.log("total_excellentp",total_excellentp);
            // console.log('total_averagep',total_averagep);
            // console.log('total_goodp',total_goodp);
            // console.log("total_badp",total_badp);
            // console.log("total_poorp",total_poorp);
            // console.log("total_final",total_final);
            // console.log("total_final2",total_final2);
            // console.log("total_stars",total_stars);

            si = (total_good + total_bad) / (total_good + total_bad + total_average + total_poor);
            di = (total_bad2 + total_average2) / (total_goodp + total_bad2 + total_average2 + total_poor2);
            console.log('si di',si.toFixed(2),di.toFixed(2));

            
            total_stars = (si * 100) / 20; 

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
      'total_poorp': total_poorp,
      'si': si,
      'di': di
    }
  }
  kanoalgo(key){
    var self = this;
    var users = 0;
    var total_rate = 0;
    var total_rate2 = 0;
    var total_final = 0; 
    var total_final2 = 0;  
    var total_stars = 0;
    
    var total_excellent = 0;
    var total_average = 0;
    var total_good = 0;
    var total_bad = 0;
    var total_poor = 0; 
    
    var total_excellent2 = 0;
    var total_average2 = 0;
    var total_good2 = 0;
    var total_bad2 = 0;
    var total_poor2 = 0; 
    
    var total_excellentp = 0;
    var total_averagep = 0;
    var total_goodp = 0;
    var total_badp = 0;
    var total_poorp = 0; 

    var si = 0;
    var di = 0;
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
            users++;
            total_rate = 0;

            total_rate  = total_rate   +  self.kanu_evalletters(element2['Q1P1']);
            total_rate2 = total_rate2  +  self.kanu_evalletters(element2['Q1P2']);

            total_rate  = total_rate   +  self.kanu_evalletters(element2['Q2P1']);
            total_rate2 = total_rate2  +  self.kanu_evalletters(element2['Q2P2']);
            
            total_rate  = total_rate   +  self.kanu_evalletters(element2['Q3P1']);
            total_rate2 = total_rate2  +  self.kanu_evalletters(element2['Q3P2']);
          

            total_rate  = (total_rate  / 3);
            total_rate2 = (total_rate2 / 3);
 
            // console.log('total_rate'   ,total_rate);
            // console.log('total_rate2'  ,total_rate2);
            // console.log('total_rate r' ,Math.round(total_rate));
            // console.log('total_rate2 r',Math.round(total_rate2));
            // console.log("=========================================");

            switch(Math.round(total_rate)){
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
            switch(Math.round(total_rate2)){
              case 5:
                total_excellent2++;
                break;
              case 4:
                total_average2++;
                break;
              case 3:
                total_good2++;
                break;
              case 2:
                total_bad2++;
                break;
              case 1:
                total_poor2++;
                break;
            }

            total_final = total_final + total_rate;
            total_final2 = total_final2 + total_rate2;

            if(index == arr.length - 1){ 
 
            // console.log('total_final',(total_final / users));
            // console.log('total_final2',(total_final2 / users));
            // console.log('total_final r',Math.round((total_final / users)));
            // console.log('total_final2 r',Math.round((total_final2 / users)));

            total_final = Math.round((total_final / users));
            total_final2 = Math.round((total_final2 / users));
            // console.log("========================================="); 

            // console.log('total_excellent',total_excellent,Math.round(isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0));  
            // console.log('total_average',total_average,Math.round(isFinite((100 / users) * total_average)?((100 / users) * total_average):0));  
            // console.log('total_good',total_good,Math.round(isFinite((100 / users) * total_good)?((100 / users) * total_good):0));  
            // console.log('total_bad',total_bad, Math.round(isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0));  
            // console.log('total_poor',total_poor,Math.round(isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0));  

            total_excellentp = Math.round(isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0); // p
            total_averagep   = Math.round(isFinite((100 / users) * total_average)?((100 / users) * total_average):0); // m
            total_goodp      = Math.round(isFinite((100 / users) * total_good)?((100 / users) * total_good):0); // a
            total_badp       = Math.round(isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0); // o
            total_poorp      = Math.round(isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0); //  i
    
            // console.log("=========================================");

        //   total_excellentp = (isFinite((100 / total_excellent) * users)?((100 / users) * total_excellent):0); // p
        //   total_averagep = (isFinite((100 / users) * total_average)?((100 / users) * total_average):0); // m
        //   total_goodp = (isFinite((100 / users) * total_good)?((100 / users) * total_good):0); // a
        //   total_badp = (isFinite((100 / users) * total_bad)?((100 / users) * total_bad):0); // o
        //   total_poorp = (isFinite((100 / users) * total_poor )?((100 / users) * total_poor):0); //  i
            
            // total_stars = total_final; 

            
            // console.log("total_excellentp",total_excellentp);
            // console.log('total_averagep',total_averagep);
            // console.log('total_goodp',total_goodp);
            // console.log("total_badp",total_badp);
            // console.log("total_poorp",total_poorp);
            // console.log("total_final",total_final);
            // console.log("total_final2",total_final2);
            // console.log("total_stars",total_stars);

            si = (total_good + total_bad) / (total_good + total_bad + total_average + total_poor);
            di = (total_bad2 + total_average2) / (total_goodp + total_bad2 + total_average2 + total_poor2);
            console.log('si di',si.toFixed(2),di.toFixed(2));
            
            total_stars = (si * 100) / 20; 
            }
        });
      } 
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
      'total_poorp': total_poorp,
      'si': si,
      'di': di
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
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAcU-urFFoiWr-YK1wZS43jrPWhSSf1NlI',
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
export const snapshotToArraymessages = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    // console.log(childSnapshot);
      let item = childSnapshot.val();  
      // item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};