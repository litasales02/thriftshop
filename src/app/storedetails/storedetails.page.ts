import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'


@Component({
  selector: 'app-list',
  templateUrl: 'storedetails.page.html',
  styleUrls: ['storedetails.page.scss']
})
export class StoreDetailsPage implements OnInit {
  sellerstorename: "";
  selleraddress1: "";
  selleraddress2: "";
  sellername: ""; 
  cellnumber: "";
  telnumber: "";
  emails: "";
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
