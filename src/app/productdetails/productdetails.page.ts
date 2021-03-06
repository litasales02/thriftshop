import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'productdetails.page.html',
  styleUrls: ['productdetails.page.scss']
})
export class ProductDetailsPage implements OnInit {
  id: string = "";
  child: string = "";
  productname= "";
  unittype= "";
  price = "0.00";
  producttype = ""; 
  productimage = '/assets/store.png';
  iamgefile="";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
    try{
      this.id = this.activatedRoute.snapshot.paramMap.get('id');     
      this.util.getproductsbyid(this.id);
      console.log(this.util.productdata);
      this.util.productdata.forEach(element => {
        this.productimage = element.itemimg;
        this.productname = element.productname;
        this.unittype = element.unittype;
        this.price = element.price;
        this.producttype = element.producttype;
      });

    }catch(err){
      
    }
  }
  ngOnInit() {
  }

}
