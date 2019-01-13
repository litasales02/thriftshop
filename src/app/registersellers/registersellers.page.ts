import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'registersellers.page.html',
  styleUrls: ['registersellers.page.scss']
})
export class RegisterSellersPage implements OnInit {
  
  sellerstorename: "";
  selleraddress1: "";
  selleraddress2: "";
  sellerfirstname: "";
  sellerlastname: "";
  sellermiddlename: "";
  sellerusername: "";
  sellerpassword: "";
  sellerrepassword: "";

  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {}
  ngOnInit() {}
  submitdata(){
    console.log('submit');
    if (typeof(this.sellerstorename) != 'undefined' && 
    typeof(this.selleraddress1) != 'undefined' && 
    typeof(this.selleraddress2) != 'undefined' && 
    typeof(this.sellerfirstname) != 'undefined'  && 
    typeof(this.sellerlastname) != 'undefined'  && 
    typeof(this.sellermiddlename) != 'undefined' && 
    typeof(this.sellerusername) != 'undefined' && 
    typeof(this.sellerpassword) != 'undefined' ){
      if (typeof(this.sellerpassword) != 'undefined' && typeof(this.sellerrepassword) != 'undefined' && this.sellerrepassword == this.sellerpassword){
        this.util.newdata({
          'usertype': 'seller',
          'address1': this.selleraddress1, 
          'address2': this.selleraddress2, 
          'firstname': this.sellerfirstname, 
          'lastname': this.sellerlastname, 
          'middlename': this.sellermiddlename, 
          'username': this.sellerusername, 
          'password': this.sellerpassword });
        this.navigate();
      } else if (typeof(this.sellerpassword) != 'undefined' && typeof(this.sellerrepassword) && (this.sellerrepassword.length < 6 || this.sellerpassword.length < 6 )) {
        this.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
      }else {
        this.util.alerts("Add New","User password did not equal",['Ok']);
      }
    } else {    
      this.util.alerts("Add New","Please fill all text required",['Ok']);
    }
  }
  navigate() {
    this.router.navigate(['/home']);
  }
}
