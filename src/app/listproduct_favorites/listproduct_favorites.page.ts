import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'listproduct_favorites.page.html',
  styleUrls: ['listproduct_favorites.page.scss']
})
export class ListProduct_FavoritePage implements OnInit { 
  id: string = "";
  child: string = "";
  default_redirect: string = "home";
  data = null;
  star = '/assets/unhart.png';
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
        if (this.child == "storedetailshome"){
          child = "list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else if (this.child == "myproduct"){
          child = "list/storedetails/" + this.id + "/home";
          this.util.getproducts(this.id);
        } else {
          child = "home";
          this.util.getproductsall();
        }
        this.default_redirect = child;
      }catch(er){
        this.default_redirect = "home"; 
      }
  }
  ngOnInit() {
  } 
  myfaorite(event,key){
    event.stopPropagation();
    // console.log('key',key);
    this.util.updatefavorateproduct(key);
    // this.util.getfravorites(key);
    try {
      var child = "";
      if (this.child == "storedetailshome"){
        child = "list/storedetails/" + this.id + "/home";
        this.util.getproducts(this.id);
      } else if (this.child == "myproduct"){
        child = "list/storedetails/" + this.id + "/home";
        this.util.getproducts(this.id);
      } else {
        child = "home";
        this.util.getproductsall();
      }
      this.default_redirect = child;
    }catch(er){
      this.default_redirect = "home"; 
    }
  }
  favoriteselected(key){  
    return this.util.getfravorites(key);
  }
  favoritestar(key){ 
    var result = this.util.getfravorites(key);
    if(result){
      return "/assets/hart.png";
    }else{      
      return "/assets/unhart.png";
    } 
  }
  owneritem(key){
    return this.util.getfravorites(key);
  }
  navigate(item) {
    this.router.navigate([item]);
  }
  async presentActionSheet() {
    var self = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'All Products',
        icon: 'list',
        handler: () => {          
          this.navigate('/product/list/all/home');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheetseller() {
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
        text: 'All Products',
        icon: 'list',
        handler: () => {          
          this.navigate('/product/list/all/home');
        }
      }]
    });
    await actionSheet.present();
  }
}
