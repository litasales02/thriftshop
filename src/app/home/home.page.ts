import { Component, OnInit } from '@angular/core';
import { AlertController,  ActionSheetController, PopoverController  } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userlist = [];
  searchtext = '';
  filterselected = '';
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController){
    
    var timeout = setInterval(()=>{
      if(this.userlist.length > 0){
        clearInterval(timeout);
      }else{
        this.userlist = this.util.storedata;  
      }
    },1000);
  }
  getItems(ev) { 
    // set val to the value of the ev target
    var self = this;
    this.searchtext = ev.target.value;
    this.util.getstorebyname(this.searchtext,function(data){
      self.userlist = data;
    });
  }
  // async presentActionSheet() {
  //   var self = this;
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Filter Options',
  //     buttons: [{
  //       text: 'Store Name',  
  //       handler: () => { 
  //         self.filterselected = 'tshirt';   
  //         self.util.getproductsbyfilter(self.filterselected,self.searchtext);    
  //       }
  //     },{
  //       text: 'Pants',   
  //       handler: () => { 
  //         self.filterselected = 'pants';      
  //         self.util.getproductsbyfilter(self.filterselected,self.searchtext); 
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }
}
