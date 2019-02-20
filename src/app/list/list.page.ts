import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
 
  profileimg = '/assets/store.png';
  userlist = [];
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent){
    this.userlist = this.util.storedata;
    // console.log(this.userlist);
  }

  ngOnInit() {
  }
 
}
