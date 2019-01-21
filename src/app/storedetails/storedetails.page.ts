import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'storedetails.page.html',
  styleUrls: ['storedetails.page.scss']
})
export class StoreDetailsPage implements OnInit {
  sellerstorename: String = "";
  selleraddress1: String = "";
  selleraddress2: String = "";
  sellername: String = ""; 
  cellnumber: String = "";
  telnumber: String = "";
  ownername: String = "";
  emails: String = "";
  id: string = "";
  child: string = "";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.child = this.activatedRoute.snapshot.paramMap.get('child');
    this.util.storedata.forEach(element => { 
      if ( element.key == this.id ){
        var firstname = element.userdetails.firstname;
        var lastname =   element.userdetails.lastname;
        this.sellerstorename = element.storename;
        this.selleraddress1 = element.userdetails.address1;
        this.selleraddress2 = element.userdetails.address2;
        
        this.cellnumber = element.userdetails.cellnumber;
        this.telnumber = element.userdetails.telnumber;
        this.emails = element.userdetails.email;
        this.ownername = firstname.concat(" " + lastname);
      }
    });
  }

  ngOnInit() {

  }
 
}
