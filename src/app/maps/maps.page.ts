import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component' 
import {
  // GoogleMaps,
  GoogleMap,
  // GoogleMapsEvent,
  // Marker,
  // GoogleMapsAnimation,
  // MyLocation,
  // LatLngBounds,
  // GeocoderRequest,
  // GeocoderResult,
  // VisibleRegion,
  // Geocoder,
  // LatLng,
  // BaseArrayClass, 
} from '@ionic-native/google-maps';

 declare var google;
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
  trackingdata = {
    key: '',
    title: '',
    position: {
      lat: 0.0,
      lng: 0.0
    }
  };
  showList: boolean = false;
  trackinglat = 7.148419523108726;
  trackinglng = 125.52915832519531;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  searchtxt: "";
  searchBox:null;
  storenames = [];
  storenamesresult = [];
  constructor(
    public router: Router, 
    public alertCtrl: AlertController, 
    private util: AppComponent) {  
    if(!this.util.geoaccurate){
      this.util.ShowToast("Your Phone Location is not Accurate.\nyou notice your location is not same.");
    }
    this.lat = this.util.usergeolocationlat;
    this.lng = this.util.usergeolocationlng;  
    // this.searchBox = new google.maps.places.SearchBox(this.searchtxt);
  }
  reset(){
    var marker;
    var self = this;
    self.trackingdata = {
      key: '',
      title: '',
      position: {
        lat: 0.0,
        lng: 0.0
      },
    }
    try {
      this.map.clear();
    }catch(er){

    }
    var infowindow = new google.maps.InfoWindow();
  
    self.util.sellergeodata.forEach(element => {
      console.log(element);     
      console.log(element.key);
      self.storenames.push(element.Store);
      var keys = typeof(element.key)!='undefined'?element.key:'me'; 
      marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(element.position.lat,element.position.lng)
      });
      google.maps.event.addListener(marker, 'click', (function(marker,i) {
        return function() {
          // infowindow.setContent(locations[i][0]);
          // infowindow.open(map, marker);
          // console.log(marker);
          console.log(i);
          self.util.sellergeodata.forEach(element => {
            if(i != 'me' && i == element.key){
              self.util.markeralerts(element.title,'Get direction.',[ {
                  text:  "Yes", 
                  cssClass: 'Do you want to track to your location?',
                  handler: (blah) => { 
                    // console.log(data[1].get('key'));
                    self.tracking = true;
                    self.trackingdata = {
                      key: element.key,
                      title: element.title,
                      position: element.position,
                    };
                    self.trackinglat = element.position.lat;
                    self.trackinglng = element.position.lng;
                    var geodata = [new google.maps.LatLng(self.lat, self.lng),new google.maps.LatLng(element.position.lat, element.position.lng)];
                    console.log(geodata);
                    self.trackings(new google.maps.LatLng(self.lat, self.lng),new google.maps.LatLng(element.position.lat, element.position.lng));
                    // self.trackings([0,0] ,[0,0]);
                  }
                }, {
                  text: 'Cancel'
                }
              ])    
            }else if(i == 'me'){
              infowindow.setContent(new google.maps.LatLng(element.position.lat, element.position.lng));
              infowindow.setContent("Here I'am");
              infowindow.open(self.map, marker);
            }
          });
        
        }
      })(marker, keys)); 
    });
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
    this.util.mapdata({
      Store: '',
      title: 'Your Here!',
      icon: 'red', 
      position: {
      lat: self.lat,
      lng: self.lng
      }
    }); 
    
    this.directionsDisplay.setMap(this.map);   
    // this.trackings(new google.maps.LatLng(this.lat, this.lng),new google.maps.LatLng(7.063874176251742, 125.60772923134004));
 
    this.reset();
  } 
  trackings(start:any,end:any){
    var self = this; 
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {  
        console.log(response);
        self.directionsDisplay.setOptions( { suppressMarkers: true } );
        self.directionsDisplay.setDirections(response);
        // new google.maps.DirectionsRenderer({ 
        //   strokeColor: "#ff3838",
        //   directions : response,
        //   suppressMarkers: false
        // });
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  trackingsplace(start,end){ 
    var self = this;
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      console.log(response);
      console.log(status);
      if (status === 'OK') {        
        this.map.clear();
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  search(ev){    
    var self = this;
    // console.log(ev.key);
    if(ev.key == 'Enter' && ev.target.value != ''){
      var val = ev.target.value;
      console.log(ev.target.value);
      console.log(val.toLowerCase()); 
      console.log(this.storenames); 
      this.storenamesresult = this.storenames.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      console.log(this.storenamesresult); 
      this.showList = true;
    }else {

      this.showList = false;
    }
  }
  getpos(ev){
    var self = this;
    console.log(ev);
    this.showList = false;
    self.util.sellergeodata.forEach(element => {
      if(ev == element.Store){
        self.map.moveCamera(new google.maps.LatLng(element.position.lat,element.position.lng));
        self.map.setCameraZoom(18);
      }
    });
  }
  mapsearch(search){
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': search}, function(results, status) {
      if (status === 'OK') {
        console.log(results);
        // this.map.setCenter(results[0].geometry.location);
        // self.markermyposition.clear();
        // self.markermyposition = new google.maps.Marker({
        //   map: self.map,
        //   position: results[0].geometry.location
        // });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  async ngOnInit() { 
    await this.loadMap();
  }

}
