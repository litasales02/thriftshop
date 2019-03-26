import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController,ToastController, Platform, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 
import {
  GoogleMaps,
  GoogleMap,
  // GoogleMapsEvent,
  // Marker,
  // GoogleMapsAnimation,
  // MyLocation
} from '@ionic-native/google-maps';

declare var google;
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
    var davao_bound = {
      north: 7.5858,
      south: 6.9810,
      west: 125.2579,
      east: 125.7056,
    };

    var marker;
    var infowindow = new google.maps.InfoWindow();
    var self = this;
    var result = null;
    this.util.getstoreGeoid(this.util.selecteduserkey,function(results:any){ 
      console.log(results); 
      result = Object.values(results)[0];
      self.map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 18,
        center:  new google.maps.LatLng( result['lat'], result['lng']),
        restriction: {latLngBounds:davao_bound}
      });
      marker = new google.maps.Marker({
        map: self.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(result['lat'], result['lng'])
      }); 
      infowindow.setContent("Here I'am");
      infowindow.open(self.map, marker);
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
