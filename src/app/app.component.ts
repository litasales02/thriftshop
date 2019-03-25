import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController, MenuController } from '@ionic/angular';
// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';
import { AlertController, ToastController, LoadingController   } from '@ionic/angular';
// import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Md5} from 'ts-md5/dist/md5';

// apiKey: "AIzaSyAKTcDsFQf33AmoNOVJbl0RtLtFM-kD6DM",
// authDomain: "thrftshp.firebaseapp.com",
// databaseURL: "https://thrftshp.firebaseio.com",
// projectId: "thrftshp",
// storageBucket: "thrftshp.appspot.com",
// messagingSenderId: "171453440603"

// apiKey: 'AIzaSyBjLH-kuTHlEudLkd0QTuO5r8Eu1CoY2As',
// authDomain: 'thriffshop.firebaseapp.com',
// databaseURL: 'https://thriffshop.firebaseio.com',
// projectId: 'thriffshop',
// storageBucket: 'thriffshop.appspot.com'



const configfirebase = {
  apiKey: "AIzaSyAKTcDsFQf33AmoNOVJbl0RtLtFM-kD6DM",
  authDomain: "thrftshp.firebaseapp.com",
  databaseURL: "https://thrftshp.firebaseio.com",
  projectId: "thrftshp",
  storageBucket: "thrftshp.appspot.com",
  messagingSenderId: "171453440603"
};
firebase.initializeApp(configfirebase); 
declare var ol;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
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
  kanorating = {
    total_users:0,
    total_stars: 0,
    quality:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    suplier:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    feedback: {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    si: 0,
    di: 0,
    asc: 0
  }
  watch: any;
  usergeolocationlat = 0;
  usergeolocationlng = 0;
  alert: any;
  maxExtent = [125.2524,6.9946,125.6589,7.5885];
  ref = null;
 
  selecteditem = "";
  selecteduserkey = "";
  messagechange = false;
  newmessagecount = 0;
  kanotable = [["q","a","a","a","o"],["r","i","i","i","m"], ["r","i","i","i","m"], ["r","i","i","i","m"], ["r","r","r","r","q"]];
  constructor( 
    private nativeStorage: NativeStorage,
    public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen, 
    private statusBar: StatusBar,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private geolocation: Geolocation, 
    public navCtrl: NavController,
    public menuCtrl: MenuController ) { 
    var self = this;
    console.log('activating data please wait');
    this.ref = firebase.database().ref('maindata').orderByChild('userdetails');
    this.ref.on('value',resp =>{
      this.storedata = [];
      this.storedata = snapshotToArray(resp); 
     });

    this.initializeApp();   
    this.geolocation.getCurrentPosition().then((resp) => {
      self.usergeolocationlat = resp.coords.latitude;
      self.usergeolocationlng = resp.coords.longitude;
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
  }
  md5function(str){
    return Md5.hashStr(str);
  }
  calculateAllDistancesStores(){
    var self = this;
    var sellergeodata = []; 
    this.storedata.forEach(function(element,index,arr){
      if(typeof(element.geodata) != 'undefined'){ 
        // console.log(element.geodata.status);
        if(element.usertype == 'seller' && element.geodata.status == 1 ){ //&& element.key != self.userid


          if(element.geodata.lat != 0 && element.geodata.lng != 0){
            var totaldistance = self.distance2coor( self.usergeolocationlat,self.usergeolocationlng,element.geodata.lat,element.geodata.lng);
            let item = element.geodata;
            item.position = {"lat": element.geodata.lat,"lng":element.geodata.lng}
            item.key = element.key; 
            item.sellers = 1; 
            item.totaldistance = totaldistance; 
            item.title = "Store :" + element.storename;
            item.Store = element.storename;
            // console.log(item);
            sellergeodata.push(item);
          }

        }
      }
    });
  }
  distance2coor(lat1,lon1,lat2,lon2){
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  async dijkstrafunction(start:any,end:any,callback){
    console.log("dijkstrafunction"); 

    var graph = new ol.source.Vector({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png',
      format: new ol.format.GeoJSON()
    });
     
    var dijskra = new ol.graph.Dijskra({
      source: graph
    });

    let listenerKey = graph.on('change', function() {
      if (graph.getState() == 'ready') {
        console.log('ready');
        ol.Observable.unByKey(listenerKey);
        dijskra.path(start,end);
      }else {
        
        console.log('ready');
      }
    });
    
    // dijskra.path(start,end);
    // // dijkstra.on('calculating', function(e) {
    // //   // if ($('#path').prop('checked')) {
    // //     var route = dijkstra.getBestWay();
    // //   //   result.clear();
    // //   //   result.addFeatures(route);
    // //     callback(route)
    // //   // }
    // // });
    // dijkstra.getLength = function(geom) {
    //   if (geom.getGeometry) {
    //     //? return geom.get('km')*1000;
    //     geom = geom.getGeometry();
    //   }
    //   return ol.sphere.getLength(geom)
    // }


    dijskra.on('finish', function(e) {
      // $('#warning').hide();
      // result.clear();
      if (!e.route.length) {
        // $("#notfound").show();
      } else {
        // $("#result").show();
        console.log(e)
        var t = (e.distance/1000).toFixed(2) + 'km';
        // Weighted distance
        // if ($("#speed").prop('checked')) {
        //   var h = e.wDistance/1000;
        //   var mn = Math.round((e.wDistance%1000)/1000*60);
        //   if (mn < 10) mn = '0'+mn;
        //   t += '<br/>' + h.toFixed(0) + 'h ' + mn + 'mn';
        // }
        // $("#result span").html(t);
      }
      // result.addFeatures(e.route);
      start = end;
      // popStart.show(start);
      // popEnd.hide();
    });


  }
  menudisabled(){
    this.menuCtrl.enable(false);
  }
  menuenable(){
    this.menuCtrl.enable(true);
  }
  ngOnInit(){
    this.logstatus();
  }
  maplimitviewgeo(){
  }
  maprouting(){
    // var graph = new ol.source.Vector({
    //   url: '../data/ROUTE120.geojson',
    //   format: new ol.format.GeoJSON()
    // });
  }
  logstatus(){
    // console.log(this.router.url);
    if(!this.loginStatus && this.router.url != '/login'){
      this.menudisabled();
      this.menuRouting('login');
    }
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
    this.storedata2 = [];
    this.productdata = [];
    this.sellergeodata = [];
    this.productdatafavorite = [];
    this.usermessage = [];
    this.usermessagepanel = [];
    this.router.navigate(['/login']);
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
          if ( data.val().password === Md5.hashStr(password)){
            self.userid = data.key;
            self.drawerTitle = data.val().userdetails.firstname;
            self.loginStatus = true;
            self.profileimg = data.val().userdetails.profileimg;
            self.userType =  data.val().usertype;
            if(data.val().usertype == 'seller'){
              self.drawerTitle = data.val().storename;
              self.geodata =  data.val().geodata.status; 
              self.requirementsdata = {
                'status': data.val().requirements.status,
                'idtype':data.val().requirements.idtype,
                'govid': data.val().requirements.govid,
                'storeimg': data.val().requirements.storeimg
              };
              self.registrationstatus = data.val().requirements.status;
              self.starscss = 'drawerrate show';
              self.kanorating = self.kanoalgosetv2(data.val().feedsseller);
              console.log(self.kanorating);
              var stars = self.kanorating.total_stars;
              stars = (100 * stars) / 25;
              self.stars = self.kanorating.total_stars;
              self.rates = self.kanorating.asc;
              self.updatedataset(data.key,{
                totalStars: stars,
                rates: self.kanorating.asc
              });
              self.loadfavorite();
              if (typeof(data.val().requirements) != 'undefined'){ 
                self.requirementsdata = data.val().requirements; 
              }
            } else {
              self.registrationstatus = 1; //for buyer
              self.starscss = 'drawerrate hide';
            }
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
          item.Store = element.storename;
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
            item.storename = element.storename;
            storedata2.push(item);
          }
      // if(index == arr.length - 1){ 
      //   callback(storedata2);
      // }
    });
    callback(storedata2);
  }
  async getstoreGeoid(key,callback){

    var storedata2 = [];
    await this.storedata.forEach(function(element){
      if( element.key == key ){
        let item = element.geodata;
        item.key = element.key;
        item.utype = element.usertype;
        console.log(item);
        storedata2.push(item);
      }
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
          if(element2[1]['producttype'].toLowerCase().indexOf(productname.toLowerCase()) > -1 && element2[1]['producttype'].toLowerCase() == filers.toLowerCase()){
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
  getproductsbyfilterc(productname,callbacks){
    // // console.clear();
    // var self = this;
    // var productdata = [];
    // // console.log('filtered')
    // this.storedata.forEach(element => {
    //   if(typeof(element.product) != 'undefined'){
    //     Object.entries(element.product).forEach(function(element2,index,arr){
    //       if(element2[1]['producttype'].toLowerCase().indexOf(productname.toLowerCase()) > -1 && element2[1]['producttype'].toLowerCase() == filers.toLowerCase()){
    //         // console.log(element2[1]['productname']);
    //         let item = Object.assign({}, element2)[1];
    //         item['key'] = Object.assign({}, element2)[0]; 
    //         // item.push(element2[1]);
    //         // console.log(item);
    //         productdata.push(item);
    //       }
    //     });
    //   }
    // });
    // callbacks(productdata);
  }
  getmessages(){
    var self = this;
    let newInfo = firebase.database().ref('maindata/'+this.userid +"/messages").orderByKey();//.child('')
    newInfo.on('child_changed',childSnapshot => {  
      var total_change = childSnapshot.numChildren(); 
      var coun_data = 1;
      childSnapshot.forEach(data => { 
        // console.log(data.val());
        if(total_change <= coun_data ){
          let item = data.val(); 
            for(var x = 0; x < this.usermessage.length;x++){
              if(this.usermessage[x].key == childSnapshot.key){
                // console.log(childSnapshot);
                if(item.status == 0){
                  self.newmessagecount++;
                }
                this.usermessage[x].messages.push(item);
              } 
            } 
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
            item['storename'] = element.storename;  
            productdata.push(item);
          }
        });
      }
    });
    callback(productdata);
  }
  getproductsall(){ 
    var  kanoevaluation =  {      
      total_users :0,
      total_stars: 0,  
      quality:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
      suplier:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
      feedback: {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
      si: 0,
      di: 0,
      asc: 0
    };
    var self = this;
    this.productdata = [];
    this.storedata.forEach(element => { 
      var totaldistance = 0.0;
      if(typeof(element.geodata) != 'undefined'){ 
        if(element.geodata.lat != 0 && element.geodata.lng != 0){
          totaldistance = self.distance2coor(self.usergeolocationlat,self.usergeolocationlng,element.geodata.lat,element.geodata.lng);
        }
      }
      if(element.usertype == 'seller' && element.rstatus == 1 && typeof(element.product) != 'undefined'){        
        Object.entries(element.product).forEach(function(element2){
          // console.log(element2[1]);
            let item = Object.assign({}, element2)[1];
            item['key'] = Object.assign({}, element2)[0];
            item['totaldistance'] = totaldistance.toFixed(2);  
            kanoevaluation = self.kanoalgosetv2(element.feedsseller); 
            item['kanorate'] =  kanoevaluation.asc;
            item['status'] = typeof(item['status'])!='undefined'?item['status']:0;
            self.productdata.push(item);
        });
      } 
    })
    self.productdata.sort((a,b)=>{
      return  parseFloat(a.totaldistance) - parseFloat(b.totaldistance); 
    }); 
  }
  getproductsbyuid(key){ 
    var self = this;
    this.productdata = [];
    this.storedata.forEach(element => { 
      var totaldistance = 0.0;
      if(element.key == key){
        if(typeof(element.geodata) != 'undefined'){ 
          if(element.geodata.lat != 0 && element.geodata.lng != 0){
            totaldistance = self.distance2coor(self.usergeolocationlat,self.usergeolocationlng,element.geodata.lat,element.geodata.lng);
          }
        }
        if(element.usertype == 'seller' && element.rstatus == 1 && typeof(element.product) != 'undefined'){        
          Object.entries(element.product).forEach(function(element2){
            // console.log(element2[1]);
              let item = Object.assign({}, element2)[1];
              item['key'] = Object.assign({}, element2)[0];
              item['totaldistance'] = totaldistance.toFixed(2);  
              // item['kanorate'] = self.kanoalgosetv2(element.feedsseller).asc;  
              item['status'] = typeof(item['status'])!='undefined'?item['status']:0;
              self.productdata.push(item);
          });
        }         
      }
    })
    self.productdata.sort((a,b)=>{
      return  parseFloat(a.totaldistance) - parseFloat(b.totaldistance); 
    }); 
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
    self.newmessagecount = 0;
    this.storedata.forEach(element => {
      if(element.key == self.userid){
        if(typeof(element.messages) != 'undefined'){  
          Object.entries(element.messages).forEach(element2 => {
            if(element2[0] == 'admin'){              
                let messagecount = 0;
                let msges = [];              
                let item = {
                  key: 'admin',
                  messages: [],
                  newmessagecount: 0
                };
                Object.entries(element2[1]).forEach(msg=>{   
                  let mgss = msg[1];
                  mgss.key = msg[0];             
                  if(typeof(mgss.status)=='undefined' || mgss.status == 0){
                    self.newmessagecount++; 
                    messagecount++;
                    mgss.status = 0;
                  }
                  msges.push(mgss);     
                });
                item.messages = msges;
                item.key = element2[0]; 
                item.newmessagecount = messagecount; 
                self.usermessage.push(item);
            } else {
              self.getstorebyid(element2[0],function(rdata){  
                let messagecount = 0;
                let msges = [];              
                let item = rdata[0];
                Object.entries(element2[1]).forEach(msg=>{ 
                  let mgss = msg[1];
                  mgss.key = msg[0];                      
                  if(typeof(mgss.status)=='undefined' || mgss.status == 0){
                    self.newmessagecount++;
                    messagecount++;
                    mgss.status = 0;
                  }
                  msges.push(mgss);             
                });
                item.messages = msges;
                item.key = element2[0]; 
                item.newmessagecount = messagecount; 
                self.usermessage.push(item);
              })
            }
          }); 
        }
      }
      // console.log(self.usermessage);
    }); 
  }
  updatemessageitems(key){
    var self = this;
    var updatedUserData = {}; 
    Object.entries(self.usermessage).forEach(element => { 
      if(key == element[1].key){
        Object.values(element[1].messages).forEach(function(entries,index,arr){
          var status  = typeof(entries['status']) == 'undefined'?0:entries['status'];
          if( status == 0 )
          updatedUserData['maindata/'+ self.userid + '/messages/' + element[1].key + '/' + entries['key']] = {
            reply: entries['reply'],
            send: entries['send'],
            status: 1
          }
          if(index == arr.length - 1){ 
            firebase.database().ref().update(updatedUserData,function(error){
              if (error) {
                console.log("Error updating data:", error);
              }else{
                self.load_messages();
              }
            })
          }
        });        
      } else {
        console.log( element[1] );
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

            if(element2[0] == 'admin'){
              let msges = [];              
              let item = {
                key: 'admin',
                messages: []
              };
              Object.entries(element2[1]).forEach(msg=>{ 
                let mgss = msg[1];
                mgss.key = msg[0];
                msges.push(mgss);
              });
              item.messages = msges;
              item.key = element2[0]; 
              self.usermessage.push(item);
            } else {
              self.getstorebyid(element2[0],function(rdata){ 
                // console.log(rdata);
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
            }
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
      'reply': '',
      'status': 1
    });
    if(key == 'admin'){
      let newproduct2 =  firebase.database().ref('admindata/messages/'+ this.userid).push();
      await newproduct2.set({
        'send': '',
        'reply': message,
        'status': 0
      });          
      this.load_messages();
    }else{
      let newproduct2 =  firebase.database().ref('maindata/'+ key+ '/messages/'+ this.userid).push();
      await newproduct2.set({
        'send': '',
        'reply': message,
        'status': 0
      });       
      this.load_messages();
    }
    // this.ref.database().ref()
    if(this.usermessage != null && this.usermessage[0] != null && typeof(this.usermessage[0]) != 'undefined'){
      // console.log("send");
    }else{
      // console.log("reload message");
      this.getmessages();
      this.load_messages();
    }
    callbacks("done"); 
  } 
  
  async usersendmsgbysellers(key,message,callbacks){ 

    let newproduct =   firebase.database().ref('maindata/'+ key+ '/messages/'+ this.userid).push();
    await newproduct.set({
      'send': message,
      'reply': '',
      'status': 1
    });
    let newproduct2 =  firebase.database().ref('maindata/'+ this.userid + '/messages/'+ key).push();
    await newproduct2.set({
      'send': '',
      'reply': message,
      'status': 0
    });       
    this.load_messages();
    // this.ref.database().ref()
    if(this.usermessage != null && this.usermessage[0] != null && typeof(this.usermessage[0]) != 'undefined'){
      // console.log("send");
    }else{
      // console.log("reload message");
      this.getmessages();
      this.load_messages();
    }
    callbacks("done"); 
  } 
  async newdata(value){
    let newInfo = firebase.database().ref('maindata').push();
    await newInfo.set(value);
  }
  async updateuserdata(value){
    firebase.database().ref('maindata/'+this.userid).update(value); 
  }
  async updateuserdatadetails(value){
    firebase.database().ref('maindata/'+this.userid + "/userdetails").update(value); 
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
  async updateproduct(prodid,value){
    // console.log(value);
    firebase.database().ref('maindata/'+ this.userid + '/product/' + prodid).update(value); 
  } 
  async updateproductchild(prodid,fields,value){
    // console.log(value);
    firebase.database().ref('maindata/'+ this.userid + '/product/' + prodid + "/" + fields).update(value); 
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
    console.log(value);
    await firebase.database().ref('maindata/' + id + '/feedsseller/' + this.userid).update(value);
    // await newproduct.set(value);
  }
  kanoalgosetv2(feedsseller){
    var self = this;
    var users = 0; 
    var stars = 0;  

    var si = 0;
    var di = 0;
    var asc = 0;

    var quality = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
    var suplier = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
    var feedback = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
 
  //   total_excellentp =  m
  //   total_averagep =  a
  //   total_goodp =   o
  //   total_badp =   i
  //   total_poorp =  r

  // -LXAsHXXhdBTaTXxh3Xp
  // 1.	It is excellent = e
  // 2.	It is good = g
  // 3.	It is average = a
  // 4.	It is bad = b
  // 5.	It is poor = p 
 
    if(typeof(feedsseller) != 'undefined'){
        Object.values(feedsseller).forEach(function(element2,index,arr){   
            // load tanan user nag rate
            users++; 
            var functionals = self.kanu_evalletters(element2['Q1P1']);
            var dysfunctional = self.kanu_evalletters(element2['Q1P2']);
            // console.log(functionals);
            // console.log(dysfunctional);
            // console.log(self.kanotable[functionals][dysfunctional]);
            users++;   
            var positive = ['Q1P1','Q2P1','Q3P1'];
            var negative = ['Q1P2','Q2P2','Q3P2'];  
            var loop = 0;
            positive.forEach(keyelement => {            
              var functionals = self.kanu_evalletters(element2[keyelement]);
              var dysfunctional = self.kanu_evalletters(element2[negative[loop]]);
              var resultsmodel = self.kanotable[functionals][dysfunctional];
              switch(resultsmodel){
                case "m": 
                  if(keyelement == 'Q1P1'){
                    quality.m++;
                  }else if(keyelement == 'Q2P1'){
                    suplier.m++;                    
                  }else if(keyelement == 'Q3P1'){
                    feedback.m++;                    
                  }
                  break;
                case "a": 
                  if(keyelement == 'Q1P1'){
                    quality.a++;
                  }else if(keyelement == 'Q2P1'){
                    suplier.a++;                    
                  }else if(keyelement == 'Q3P1'){
                    feedback.a++;                    
                  }
                  break;
                case "o": 
                  if(keyelement == 'Q1P1'){
                    quality.o++;
                  }else if(keyelement == 'Q2P1'){
                    suplier.o++;                    
                  }else if(keyelement == 'Q3P1'){
                    feedback.o++;                    
                  }
                  break;
                case "i": 
                  if(keyelement == 'Q1P1'){
                    quality.i++;
                  }else if(keyelement == 'Q2P1'){
                    suplier.i++;                    
                  }else if(keyelement == 'Q3P1'){
                    feedback.i++;                    
                  }
                  break;
                case "r": 
                  if(keyelement == 'Q1P1'){
                    quality.r++;
                  }else if(keyelement == 'Q2P1'){
                    suplier.r++;                    
                  }else if(keyelement == 'Q3P1'){
                    feedback.r++;                    
                  }
                  break;
              }
              loop++;
            });
           
            if(index == arr.length - 1){ 
              
            // //   total_excellentp =  m
            // //   total_averagep =  a
            // //   total_goodp =   o
            // //   total_badp =   i
            // //   total_poorp =  r

            // //   si = ( a + o ) / ( a + o + m + i);
            // //   di = ( m + o ) / ( a + o + m + i);

            //   // si = (total_positive_average + total_positive_good) / (total_positive_average + total_positive_good + total_positive_excellent + total_positive_bad) ;
              
            //   // di = (total_negative_excellent + total_negative_good) / (total_negative_average + total_negative_good + total_negative_excellent + total_negative_bad * -1);

            //   // asc = (si + di) / 2;
  

              stars = 0;

              // quality.m 
              //   si = ( a + o ) / ( a + o + m + i);
              //   di = ( m + o ) / ( a + o + m + i);
              // var quality = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
              quality.si = (quality.a + quality.o) / (quality.a + quality.o + quality.m + quality.i);
              quality.di = (quality.m + quality.o) / (quality.a + quality.o + quality.m + quality.i) * -1;
              quality.asc = (quality.si + quality.di) / 2;
              quality.di = isNaN(quality.di)?0:quality.di;
              quality.si = isNaN(quality.si)?0:quality.si;

              suplier.si = (suplier.a + suplier.o) / (suplier.a + suplier.o + suplier.m + suplier.i);
              suplier.di = (suplier.m + suplier.o) / (suplier.a + suplier.o + suplier.m + suplier.i) * -1;
              suplier.asc = (suplier.si + suplier.di) / 2;
              suplier.di = isNaN(suplier.di)?0:suplier.di;
              suplier.si = isNaN(suplier.si)?0:suplier.si;
              
              feedback.si = (feedback.a + feedback.o) / (feedback.a + feedback.o + feedback.m + feedback.i);
              feedback.di = (feedback.m + feedback.o) / (feedback.a + feedback.o + feedback.m + feedback.i) * -1;
              feedback.asc = (feedback.si + feedback.di) / 2;
              feedback.di = isNaN(feedback.di)?0:feedback.di;
              feedback.si = isNaN(feedback.si)?0:feedback.si;

              si = (quality.si + suplier.si + feedback.si);
              di = (quality.di + suplier.di + feedback.di);
              asc = (( si + di) / 2);

              si = isNaN(si)?0:si;
              di = isNaN(di)?0:di;
              asc = isNaN(asc)?0:asc;
              var ascs = asc > 1?asc.toFixed(2):asc;
              stars = (Number(ascs) * 100) / 25;

            }
        });
    }
    return {
      total_users: users,
      total_stars: stars, 
      quality: quality,
      suplier: suplier,
      feedback: feedback,
      si: si,
      di: di,
      asc: asc
    }
  }
  kanoalgov2(key){
    var self = this;
    var users = 0; 
    var stars = 0; 

    var si = 0;
    var di = 0;
    var asc = 0;

    var quality = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
    var suplier = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
    var feedback = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
 

    // 5 = q , a , a , a , o
    // 4 = r , i , i , i , m
    // 3 = r , i , i , i , m
    // 2 = r , i , i , i , m
    // 1 = r , r , r , r , q
  this.storedata.forEach(function(element ,index1,arr1) {    
      if(typeof(element.feedsseller) != 'undefined' && element.key == key){
        Object.values(element.feedsseller).forEach(function(element2,index,arr){   
          users++;   
          var positive = ['Q1P1','Q2P1','Q3P1'];
          var negative = ['Q1P2','Q2P2','Q3P2'];  
          var loop = 0;
          positive.forEach(keyelement => {            
            var functionals = self.kanu_evalletters(element2[keyelement]);
            var dysfunctional = self.kanu_evalletters(element2[negative[loop]]);
            var resultsmodel = self.kanotable[functionals][dysfunctional];
            switch(resultsmodel){
              case "m": 
                if(keyelement == 'Q1P1'){
                  quality.m++;
                }else if(keyelement == 'Q2P1'){
                  suplier.m++;                    
                }else if(keyelement == 'Q3P1'){
                  feedback.m++;                    
                }
                break;
              case "a": 
                if(keyelement == 'Q1P1'){
                  quality.a++;
                }else if(keyelement == 'Q2P1'){
                  suplier.a++;                    
                }else if(keyelement == 'Q3P1'){
                  feedback.a++;                    
                }
                break;
              case "o": 
                if(keyelement == 'Q1P1'){
                  quality.o++;
                }else if(keyelement == 'Q2P1'){
                  suplier.o++;                    
                }else if(keyelement == 'Q3P1'){
                  feedback.o++;                    
                }
                break;
              case "i": 
                if(keyelement == 'Q1P1'){
                  quality.i++;
                }else if(keyelement == 'Q2P1'){
                  suplier.i++;                    
                }else if(keyelement == 'Q3P1'){
                  feedback.i++;                    
                }
                break;
              case "r": 
                if(keyelement == 'Q1P1'){
                  quality.r++;
                }else if(keyelement == 'Q2P1'){
                  suplier.r++;                    
                }else if(keyelement == 'Q3P1'){
                  feedback.r++;                    
                }
                break;
            }
            loop++;
          });
         
          if(index == arr.length - 1){ 
        
              stars = 0;

              // quality.m 
              //   si = ( a + o ) / ( a + o + m + i);
              //   di = ( m + o ) / ( a + o + m + i);
              // var quality = {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0};
              quality.si = (quality.a + quality.o) / (quality.a + quality.o + quality.m + quality.i);
              quality.di = (quality.m + quality.o) / (quality.a + quality.o + quality.m + quality.i) * -1;
              quality.asc = (quality.si + quality.di) / 2;
              quality.di = isNaN(quality.di)?0:quality.di;
              quality.si = isNaN(quality.si)?0:quality.si;

              suplier.si = (suplier.a + suplier.o) / (suplier.a + suplier.o + suplier.m + suplier.i);
              suplier.di = (suplier.m + suplier.o) / (suplier.a + suplier.o + suplier.m + suplier.i) * -1;
              suplier.asc = (suplier.si + suplier.di) / 2;
              suplier.di = isNaN(suplier.di)?0:suplier.di;
              suplier.si = isNaN(suplier.si)?0:suplier.si;
              
              feedback.si = (feedback.a + feedback.o) / (feedback.a + feedback.o + feedback.m + feedback.i);
              feedback.di = (feedback.m + feedback.o) / (feedback.a + feedback.o + feedback.m + feedback.i) * -1;
              feedback.asc = (feedback.si + feedback.di) / 2;
              feedback.di = isNaN(feedback.di)?0:feedback.di;
              feedback.si = isNaN(feedback.si)?0:feedback.si;

              si = (quality.si + suplier.si + feedback.si);
              di = (quality.di + suplier.di + feedback.di);
              asc = (( si + (di)) / 2);

              si = isNaN(si)?0:si;
              di = isNaN(di)?0:di;
              asc = isNaN(asc)?0:asc;
              var ascs = asc > 1?asc.toFixed(2):asc;
              stars = (Number(ascs) * 100) / 25;
          }
        });
      } 
  });
    return {
      total_users:users,
      total_stars: stars,
      quality: quality,
      suplier: suplier,
      feedback: feedback,
      si: si,
      di: di,
      asc: asc
    }
  } 
  kanu_evalletters(val){
    if (val == 'e'){ // 1.	It is excellent = e
      return 4;
    } else if(val == 'g') { // 2.	It is good = g
      return 3;
    } else if(val == 'a') { // 3.	It is average = a
      return 2;
    } else if(val == 'b') { // 4.	It is bad = b
      return 1;
    } else if(val == 'p') { // 5.	It is poor = p
      return 0;
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
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });    
    // firebase.initializeApp(configfirebase);
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    var dataval = childSnapshot.val();
    var itms = [];
    if(typeof(dataval.requirements) != 'undefined'){
      itms = Object.entries(dataval.requirements); 
    }
    let item = childSnapshot.val();
    item.key = childSnapshot.key; 
    if(dataval.usertype == 'seller'  && itms != null && dataval.requirements.status == 1 && dataval.requirements.govid != ""){ 
      item.rstatus = 1;
    } else {
      item.rtatus = 0;
    }
    // console.log(item);
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