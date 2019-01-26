import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'listproduct.page.html',
  styleUrls: ['listproduct.page.scss']
})
export class ListProductPage implements OnInit { 
  id: string = "";
  child: string = "";
  default_redirect: string = "home";
  data = null;
  
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
      try {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.child = this.activatedRoute.snapshot.paramMap.get('child');
        var child = "";
        if ( this.child == "storedetailshome"){
          child = "list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else if ( this.child == "myproduct"){
          child = "list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else {
          child = "home";
          this.util.getproductsall();
        }
        // console.log(child);
        this.default_redirect = child;
      }catch(er){
        this.default_redirect = "home";
        // console.log('error  ' ,er);
      }
      
      // console.log(this.util.productdata);
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  navigate(item) {
    this.router.navigate([item]);
  }
  async presentActionSheet() {
    var self = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Create New', 
        icon: 'add',
        handler: () => { //createproduct
          // self.util.getproducts(self.util.userid); 
          this.navigate('/createproduct');
        }
      },{
        text: 'My Products',  
        icon: 'paper',
        handler: () => {
          self.util.getproducts(self.util.userid); 
        }
      }, {
        text: 'All Products',
        icon: 'list',
        handler: () => {
          this.util.getproductsall(); 
        }
      }]
    });
    await actionSheet.present();
  }
}
