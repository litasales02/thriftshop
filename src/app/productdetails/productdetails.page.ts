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
  directlocation = "/product/list/all/home"
  storename = "";
  productname= "";
  unittype= "";
  price = "0.00";
  producttype = ""; 
  description = "";
  productimage = '/assets/store.png';
  iamgefile="";
  fav = 0;
  routerlingks = "";
  star = '/assets/unhart.png';
  selecteduserkey = "";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
    var self =  this;
    try{
      this.id = this.activatedRoute.snapshot.paramMap.get('id'); // idkey ni sa product    
      this.child = this.activatedRoute.snapshot.paramMap.get('child');   
      if(this.child == "home"){
        this.directlocation = "/home";
      }
      // this.util.userid
      // this.util.getproductsbyid(this.id);
      // console.log(this.util.productdata);
      this.util.getproductsbyid2(this.id,(element)=>{
        // console.log(element);
        element.forEach(element => {
          this.productimage = element.itemimg;
          this.productname = element.productname;
          this.unittype = element.unittype;
          this.price = element.price;
          this.producttype = element.producttype;
          self.util.selecteduserkey = element.ukey;
          self.selecteduserkey = element.ukey;
          self.util.selecteditem = element.key;
          self.description = element.description;
          self.storename = element.storename;
          // console.log(self.util.selecteduserkey);
          // console.log(self.util.selecteditem);
          self.routerlingks = "/message/panel/"+self.util.selecteduserkey+"/products_details";
          // console.log(self.routerlingks);
          this.util.loadfavorite2(element.ukey,function(r){
            self.fav = r;
          });
        });
      });


    }catch(err){
      
    } 
  }
  ngOnInit() {
  }
  routes(){ 
    this.util.menuRouting(this.routerlingks);
  }
  loadmymap(){
    this.util.menuRouting('storemap/' + this.util.selecteduserkey);    
  }

  myfaorite(event,key){
    event.stopPropagation();
    this.util.updatefavorateproduct(key);
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
}
