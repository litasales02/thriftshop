import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation, 
} from '@ionic-native/google-maps';

 
@Component({
  selector: 'app-list',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss']
})
export class MapsPage implements OnInit {
  map: GoogleMap;
  loading: any;
  lat = 7.148419523108726;
  lng = 125.52915832519531;
  markerdata = []
  markermyposition:any;
  tracking = false;
  trackingdata = {};
  trackinglat = 7.148419523108726;
  trackinglng = 125.52915832519531;
  constructor(
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) {  
    if(!this.util.geoaccurate){
      this.util.ShowToast("Your Phone Location is not Accurate.\nyou notice your location is not same.");
    }
    this.lat = this.util.usergeolocationlat;
    this.lng = this.util.usergeolocationlng;     
  }
  reset(){
    
    var self = this;
    try {
      this.map.clear();
    }catch(er){

    }
    this.markermyposition = this.map.addMarkerClusterSync({
      title: 'Your Here!',
      markers: self.util.sellergeodata,
      animation: 'DROP',
      boundsDraw: true,
      icons: [
          {min: 2000, max: 100000, url: "/assets/pin.png", anchor: {x: 16, y: 16}} 
      ]
    });
    // self.markermyposition = this.map.addMarkerSync({
    //   title: 'Your Here!',
    //   icon: 'red', 
    //   position: {
    //   lat: self.lat,
    //   lng: self.lng
    //   }
    // }); 
    this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
      // console.log("click reset data",data); 
      if(typeof(data[1].get("key") !== 'undefined') && typeof(data[1].get("sellers") !== 'undefined') && data[1].get("sellers") == 1){
        self.util.markeralerts(data[1].get("title"),'Do you want to track to your location?',[
          {
            text:  "Yes", 
            cssClass: 'Do you want to track to your location?',
            handler: (blah) => {
              console.log(blah);
              // console.log(data[1].get('key'));
              self.tracking = true;
              self.trackingdata = {
                key: data[1].get('key'),
                title: data[1].get('title'),
                position: data[1].get('position'),
              }
              self.trackinglat = data[0].lat;
              self.trackinglng = data[0].lng;
              self.map.clear();
            }
          }, {
            text: 'Cancel'
          }

        ])       
      }

    });
  }
  loadMap() {
    // lat = 7.148419523108726;
    // lng = 125.52915832519531;
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
    // var bounds = new LatLngBounds([new LatLng(-35.0, 138.58), new LatLng(-34.9, 138.61)]);  
    // this.map.setLatLngBoundsForCameraTarget(bounds)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 14,
        tilt: 30
      }
    }); 
    // this.map.on(GoogleMapsEvent.MAP_DRAG).subscribe(()

    // );
    
    // this.markermyposition = this.map.addMarkerSync({
    //   title: 'Your Here!',
    //   icon: 'red',
    //   animation: 'DROP',
    //   position: {
    //     lat: self.lat,
    //     lng: self.lng
    //   }
    // }); 
    // this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
    //   console.log("click reset data");
    // });
    this.util.mapdata({
      title: 'Your Here!',
      icon: 'red', 
      position: {
      lat: self.lat,
      lng: self.lng
      }
    }); 
    this.reset();
  } 
  trackings(){

  }
  async ngOnInit() { 
    await this.loadMap();
  }

}
