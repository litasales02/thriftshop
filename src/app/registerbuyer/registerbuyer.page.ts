import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-list',
  templateUrl: 'registerbuyer.page.html',
  styleUrls: ['registerbuyer.page.scss']
})
export class RegisterBuyerPage implements OnInit {
  private selectedItem: any; 
  buyeraddress: "";
  buyerfirstname: "";
  buyerlastname: "";
  buyermiddlename: "";
  buyerusername: "";
  buyerpassword: "";
  buyerrepass: "";
  constructor(public alertCtrl: AlertController,private util: AppComponent) {

  }
  ngOnInit() {
  }
  submitdata(){
    console.log('submit');
    if (typeof(this.buyeraddress) != 'undefined' && typeof(this.buyerfirstname) != 'undefined' && typeof(this.buyerlastname) != 'undefined' && typeof(this.buyermiddlename) != 'undefined'  && typeof(this.buyerusername) != 'undefined'  && typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerrepass) != 'undefined' ){
      if (typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerrepass) != 'undefined' && this.buyerpassword == this.buyerrepass){

      } else if (typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerusername) && (this.buyerpassword.length < 6 || this.buyerusername.length < 6 )) {
        this.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
      }else {
        this.util.alerts("Add New","User password did not equal",['Ok']);
      }
    } else {    
      this.erroralert();
    }
  }
  async erroralert() { 
    const alert = await this.alertCtrl.create({
      header: 'Add New',
      subHeader: 'Please fill all required.',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.' + this.buyeraddress,
      buttons: ['OK']
    })
    await alert.present();
  }
}
