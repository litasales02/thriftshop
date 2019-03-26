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
  id: string = "";
  child: string = "";
  default_redirect: string = "home";
  list_redirect = "/list/storedetails";
  data = null;
  star = '/assets/unhart.png'; 
  selected = 'All';
  searchtext = '';
  filterselected = 'All';
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
      try {
        // this.id = this.activatedRoute.snapshot.paramMap.get('id');
        // this.child = this.activatedRoute.snapshot.paramMap.get('child');
        // var child = "";
        // if (this.child == "storedetailshome"){
        //   child = "list/storedetails/" + this.id + "/home";
        //   this.list_redirect = "/products/details";
        //   this.util.getproducts(this.id);
        // } else if (this.child == "myproduct"){
        //   child = "list/storedetails/" + this.id + "/home";
        //   this.list_redirect = "/products/details";
        //   this.util.getproducts(this.id);
        // } else {
        //   child = "home";
        //   this.list_redirect = "/products/details";
        // }
        this.default_redirect = 'home';
      }catch(er){
        this.default_redirect = "home"; 
      }
      console.log(this.default_redirect );
  }
  returnlinks(id){
    if (this.child == "storedetailshome"){
      // child = "list/storedetails/" + this.id + "/home";
      this.list_redirect = "/products/details";
    } else if (this.child == "myproduct"){
      // child = "list/storedetails/" + this.id + "/home";
      this.list_redirect = "/products/details";
    } else {
      // child = "home";
      this.list_redirect = "/products/details";
    }
  }
  ngOnInit() {
    this.util.getproductsall();
  } 
  myfaorite(event,key){
    event.stopPropagation();
    // console.log('key',key);
    this.util.updatefavorateproduct(key);
    // this.util.getfravorites(key);
    try {
      var child = "";
      if (this.child == "storedetailshome"){
        child = "list/storedetails/" + key + "/home";
        this.util.getproducts(this.id);
      } else if (this.child == "myproduct"){
        child = "list/storedetails/" + key + "/home";
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
    // this.util.getfravorites(key);
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
  navigate(item) {
    this.router.navigate([item]);
  }
  async presentActionSheet() {
    var self = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter Options',
      buttons: [{
        text: 'Create New', 
        icon: 'add',
        handler: () => { //createproduct
          // self.util.getproducts(self.util.userid); 
          this.navigate('/createproduct');
        }
      },{
        text: 'My Products',
        icon: 'list',
        handler: () => {                  
          this.util.getproductsallcant();
          if(self.util.registrationstatus == 0 && self.util.loginStatus){
            self.util.alerts('Hi','Your Product will not show on product list until you update and complete the requirements',['ok']);
          }
        }
      },{
        text: 'All Products',
        icon: 'list',
        handler: () => {                  
          this.util.getproductsall();
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheetFilter() {
    var self = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Product Filter Options',
      buttons: [{
        text: 'All',  
        handler: () => {
          self.selected = 'All';
          self.filterselected = 'all';
          this.util.getproductsall();
        }
      },{
        text: 'T-shirt',  
        handler: () => {
          self.selected = 'T-shirt';   
          self.filterselected = 'tshirt';   
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);    
        }
      },{
        text: 'Pants',   
        handler: () => {
          self.selected = 'Pants';    
          self.filterselected = 'pants';      
          self.util.getproductsbyfilter(self.filterselected,self.searchtext); 
        }
      }, {
        text: 'Shorts Pants', 
        handler: () => {
          self.selected = 'Short Pants';  
          self.filterselected = 'shortpants';   
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);      
        }
      }, {
        text: 'Long Pants', 
        handler: () => {
          self.selected = 'Long Pants';  
          self.filterselected = 'longpants';    
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);     
        }
      }, {
        text: 'Underwares', 
        handler: () => {
          self.selected = 'Underwares'; 
          self.filterselected = 'underwares';    
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);      
        }
      }, {
        text: 'Bags', 
        handler: () => {
          self.selected = 'Bags';  
          self.filterselected = 'bags';    
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);     
        }
      }, {
        text: 'Shoes', 
        handler: () => {
          self.selected = 'Shoes';  
          self.filterselected = 'shoes';     
          self.util.getproductsbyfilter(self.filterselected,self.searchtext);    
        }
      }]
    });
    await actionSheet.present();
  }
  getItems(ev) { 
    // set val to the value of the ev target
    this.searchtext = ev.target.value;
    this.util.getproductsbyname(this.searchtext);
  }
}
