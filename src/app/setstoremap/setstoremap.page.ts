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

@Component({
  templateUrl: 'setstoremap.page.html',
  styleUrls: ['setstoremap.page.scss']
})
export class SetStoreMapPage implements OnInit {
  map: GoogleMap;
  loading: any;
  lat = 7.148419523108726;
  lng = 125.52915832519531;
  markermyposition:any;
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) { 

  }
  loadMap() {
    var self = this; 
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 18,
        tilt: 30
      }
    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      (data) => {
          // console.log("Click MAP",data);
          self.lat = data[0].lat;
          self.lng = data[0].lng;
          self.util.setgeolat = data[0].lat;
          self.util.setgeolong = data[0].lng;
          self.util.geodata = 1;
          this.map.clear();
          this.markermyposition = this.map.addMarkerSync({
            title: 'Your Here!',
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: this.lat,
              lng: this.lng
            }
          });
          this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      
          });
      }
  );

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
}
