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
  templateUrl: 'storemap.page.html',
  styleUrls: ['storemap.page.scss']
})
export class StoreMapPage implements OnInit {
  map: GoogleMap;
  loading: any;
  lat = 7.148419523108726;
  lng = 125.52915832519531;
  markermyposition:any;
  directlocation = "";
  id = "";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.directlocation = "products/details/" +  this.id + "/home";
  }
  loadMap() { 
    var self = this;
    var result = null;
    this.util.getstoreGeoid(this.id,function(results:any){

      result = Object.values(results)[0];
      // console.log(result['lat'],result['lng']);
      self.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: result['lat'],
            lng: result['lng']
          },
          zoom: 18,
          tilt: 30
        }
      });

      self.markermyposition = self.map.addMarkerSync({
        title: 'Store is here!',
        icon: 'blue',
        position: {lat: result['lat'], lng: result['lng']},
        animation: 'DROP'
      }); 
    });

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
