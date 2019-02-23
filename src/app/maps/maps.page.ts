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
  MyLocation
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
  constructor(
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) { 
    var self = this;
    this.lat = this.util.usergeolocationlat;
    this.lng = this.util.usergeolocationlng;
   // var inter = setInterval(()=>{
      // console.log("this.lat",this.lat);
      // console.log("this.lng",this.lng);
      // this.util.mapdata({
      //   title: 'Your Here!',
      //   icon: 'red', 
      //   position: {
      //   lat: self.lat,
      //   lng: self.lng
      //   }
      // });
      // // console.log(this.util.sellergeodata);
      // this.reset();
    //},5000);
    
  }
  reset(){
    
    var self = this;
    // this.map.clear();
    this.markermyposition = this.map.addMarkerClusterSync({
      title: 'Your Here!',
      markers: self.util.sellergeodata,
      animation: 'DROP',
      icons: [
          {min: 2, max: 100, url: "/assets/pin.png", anchor: {x: 16, y: 16}} 
      ]
    });
    self.markermyposition = this.map.addMarkerSync({
      title: 'Your Here!',
      icon: 'red', 
      position: {
      lat: self.lat,
      lng: self.lng
      }
    }); 

    this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
      console.log("click reset data",data);
      self.util.markeralerts("title","label",[
        {
          text: 'Cancel', 
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }

      ])
    });
  }
  loadMap() {
    var self = this;
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 12,
        tilt: 30
      }
    });
    
    // this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
    //     (data) => {
    //       console.log("Click MAP",data);
    //       console.log("Click MAP",data[0].lat);
    //       self.lat = data[0].lat;
    //       self.lng = data[0].lng;
    //       self.markermyposition = this.map.addMarkerSync({
    //         title: 'Your Here!',
    //         icon: 'red',
    //         animation: 'DROP',
    //         position: {
    //           lat: self.lat,
    //           lng: self.lng
    //         }
    //       }); 
    //     }
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
  async ngOnInit() { 
    await this.loadMap();
  }
 
  
}
