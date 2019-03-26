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
  userlistdata = [];
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent){
    var self = this;
    // this.userlist = this.util.storedata;
    // console.log(this.userlist);
    this.util.getstoredata(function(data){
      self.userlistdata = data;
      console.log(data)
    });
  }

  ngOnInit() {
    // this.userlist = this.util.storedata;
    // var self = this;
    // // this.userlist = this.util.storedata;
    // // console.log(this.userlist);
    // this.util.getstoredata(function(data){
    //   self.userlist = data;
    //   console.log(data)
    // });
  }
 
}
