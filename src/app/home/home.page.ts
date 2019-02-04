import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userlist = [];
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent){
    this.userlist = this.util.storedata;
    // console.log(this.userlist);
    
    this.util.kanoalgo('-LXAsHXXhdBTaTXxh3Xp');
  }
}
