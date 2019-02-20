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
  markermyposition:any;
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
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
        (data) => {
          self.lat = data.coords.latitude;
          self.lng = data.coords.longitude;
            console.log("Click MAP",data);
            this.markermyposition = this.map.addMarkerSync({
              title: 'Your Here!',
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: self.lat,
                lng: self.lng
              }
            });
            this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        
            });
        }
    );
    this.markermyposition = this.map.addMarkerSync({
      title: 'Your Here!',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
    this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

    });

  }
  constructor(
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) { 
    this.lat = this.util.usergeolocationlat;
    this.lng = this.util.usergeolocationlng;
    var inter = setInterval(()=>{
      console.log("this.lat",this.lat);
      console.log("this.lng",this.lng);
      // this.markermyposition.setPosition([this.lat,this.lng]);
    },5000);
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    // await this.platform.ready();
    await this.loadMap();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  
}
