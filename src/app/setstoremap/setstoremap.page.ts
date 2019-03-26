import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController,ToastController, Platform, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

declare var google;
@Component({
  templateUrl: 'setstoremap.page.html',
  styleUrls: ['setstoremap.page.scss']
})
export class SetStoreMapPage implements OnInit {
  map = null;
  markers = [];
  loading: any;
  lat = 7.148419523108726;
  lng = 125.52915832519531;
  markermyposition:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) { 

  }
  loadMap() {
    var davao_bound = {
      north: 7.5858,
      south: 6.9810,
      west: 125.2579,
      east: 125.7056,
    };
  
    if((this.util.usergeolocationlat == 0 && this.util.usergeolocationlng == 0) ||      
      ((this.util.usergeolocationlat < 7.5858 || this.util.usergeolocationlat > 6.9782) &&   
      (this.util.usergeolocationlng < 125.25792 || this.util.usergeolocationlng > 125.7056))){
      this.lat =  7.148419523108726;
      this.lng =  125.52915832519531;
      console.log("data.coords",1);
    }else{
      console.log("data.coords",2);
    }
    var self = this;  
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 14,
      center:  new google.maps.LatLng(this.lat, this.lng),
      restriction: {latLngBounds:davao_bound}
    });
    this.directionsDisplay.setMap(this.map);  
    
    var marker; 
    // marker = new google.maps.Marker({
    //   map: this.map,
    //   draggable: false,
    //   animation: google.maps.Animation.DROP,
    //   position: new google.maps.LatLng(element.position.lat,element.position.lng)
    // });
    this.map.addListener('click', function(e) {
      // self.map.clear();
      // marker.setMap(null);
      if(self.markers.length > 0){
        for(var x = 0 ; x < self.markers.length ; x++){
          self.markers[x].setMap(null);
        }
      }
      marker = new google.maps.Marker({
        position: e.latLng,
        map: self.map
      });
      self.map.panTo(e.latLng);
      self.markers.push(marker);

      // console.log(e.latLng.lat());
      // console.log(e.latLng.lng());
      self.lat =e.latLng.lat();
      self.lng = e.latLng.lng();
      self.util.setgeolat = e.latLng.lat();
      self.util.setgeolong = e.latLng.lng();
      self.util.geodata = 1;
    });
    // var self = this; 
    // this.map = GoogleMaps.create('map_canvas', {
    //   camera: {
    //     target: {
    //       lat: self.util.usergeolocationlat,
    //       lng: self.util.usergeolocationlng
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // });
    // this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
    //   (data) => {
    //       // console.log("Click MAP",data);
    //       self.lat = data[0].lat;
    //       self.lng = data[0].lng;
    //       self.util.setgeolat = data[0].lat;
    //       self.util.setgeolong = data[0].lng;
    //       self.util.geodata = 1;
    //       this.map.clear();
    //       this.markermyposition = this.map.addMarkerSync({
    //         title: 'Your Here!',
    //         icon: 'red',
    //         animation: 'DROP',
    //         position: {
    //           lat: this.lat,
    //           lng: this.lng
    //         }
    //       });
    //       this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      
    //       });
    //   }
  // );

  }
  async ngOnInit() { 
    await this.loadMap();
  } 
  submitlogin(){
    this.router.navigate(['/accountsetting']);
  }
  navigate() {
    this.router.navigate(['/home']);
  }
  searchaddress(ev){
    var self = this;  
    if(ev.key == 'Enter' && ev.target.value != ''){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': ev.target.value}, function(results, status) {
        if (status === 'OK') { 
          self.map.setCenter(results[0].geometry.location); 
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

  }
}
