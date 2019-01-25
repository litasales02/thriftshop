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
          child = "/list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else if ( this.child == "myproduct"){
          child = "/list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else {
          child = "/product/list/all/home";
          this.util.getproductsall();
          console.log("else");
        }
        this.default_redirect = child;
      }catch(er){
        console.log('error  ' ,er);
      }
      
      console.log(this.util.productdata);
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  async presentActionSheet() {
    var self = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'My Products', 
        icon: 'paper',
        handler: () => {
          self.util.getproducts(self.util.userid);
          console.log('paper clicked ' + self.util.userid);
        }
      }, {
        text: 'All Products',
        icon: 'list',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
