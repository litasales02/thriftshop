import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component' 
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LatLngBounds,
  GeocoderRequest,
  GeocoderResult,
  VisibleRegion,
  Geocoder,
  LatLng,
  BaseArrayClass, 
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
  trackingdata = {};
  trackinglat = 7.148419523108726;
  trackinglng = 125.52915832519531;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  searchtxt: "";
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

    // marker.addListener('click', toggleBounce);
    // function toggleBounce() {
    //   if (marker.getAnimation() !== null) {
    //     marker.setAnimation(null);
    //   } else {
    //     marker.setAnimation(google.maps.Animation.BOUNCE);
    //   }
    // }
    var x = 0;
    self.util.sellergeodata.forEach(element => {
      console.log(element);      
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
          console.log(marker);
          console.log(i);
          self.util.sellergeodata.forEach(element => {
            if(i == element.key){
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
                    var geodata = [new LatLng(this.lat, this.lng),new LatLng(element.position.lat,  element.position.lng)];
                    // console.log(geodata);
                    this.trackings(new LatLng(this.lat, this.lng),new LatLng(element.position.lat, element.position.lng));
                    // self.trackings([0,0] ,[0,0]);
                  }
                }, {
                  text: 'Cancel'
                }
              ])    
            }
          });
        
        }
      })(marker, element.key));
      x++;
    });

    // this.markermyposition = this.map.addMarkerClusterSync({
    //   title: 'Your Here!',
    //   markers: self.util.sellergeodata,
    //   animation: 'DROP',
    //   boundsDraw: true,
    //   icons: [
    //       {min: 2000, max: 100000, url: "/assets/pin.png", anchor: {x: 16, y: 16}} 
    //   ]
    // }); 
    // this.markermyposition.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => { 
    //   if(typeof(data[1].get("key") !== 'undefined') && typeof(data[1].get("sellers") !== 'undefined') && data[1].get("sellers") == 1){
    //     self.util.markeralerts(data[1].get("title"),'Get direction.',[
    //       {
    //         text:  "Yes", 
    //         cssClass: 'Do you want to track to your location?',
    //         handler: (blah) => { 
    //           // console.log(data[1].get('key'));
    //           self.tracking = true;
    //           self.trackingdata = {
    //             key: data[1].get('key'),
    //             title: data[1].get('title'),
    //             position: data[1].get('position'),
    //           };
    //           self.trackinglat = data[0].lat;
    //           self.trackinglng = data[0].lng;
    //           var geodata = [new LatLng(this.lat, this.lng),new LatLng(data[0].lat,  data[0].lng)];
    //           // console.log(geodata);
    //           this.trackings(new LatLng(this.lat, this.lng),new LatLng(data[0].lat,  data[0].lng));
    //           // self.trackings([0,0] ,[0,0]);
    //         }
    //       }, {
    //         text: 'Cancel'
    //       }

    //     ])       
    //   }

    // });
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
      title: 'Your Here!',
      icon: 'red', 
      position: {
      lat: self.lat,
      lng: self.lng
      }
    }); 
    this.directionsDisplay.setMap(this.map);
    this.reset();
    // this.trackings(new google.maps.LatLng(this.lat, this.lng),new google.maps.LatLng(7.063874176251742, 125.60772923134004));
  } 
  trackings(start:any,end:any){
    var self = this; 
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {  
        console.log(response);
        self.directionsDisplay.setDirections(response);
        new google.maps.DirectionsRenderer({ 
          directions : response,
          suppressMarkers: true
        });
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
    // console.log(ev.key);
    if(ev.key == 'Enter' && ev.target.value != ''){
      console.log(ev.target.value);
    }
  }
  mapsearch(search){
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': search}, function(results, status) {
      if (status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        self.markermyposition.clear();
        self.markermyposition = new google.maps.Marker({
          map: self.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  async ngOnInit() { 
    await this.loadMap();
  }

}
