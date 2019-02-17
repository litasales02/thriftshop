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
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) { 

  }
  loadMap() {
    var lat = 7.148419523108726;
    var lng = 125.52915832519531;
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18,
        tilt: 30
      }
    });
  }
  async ngOnInit() { 
    await this.loadMap();
  } 
  
}
