import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'updateproduct.page.html',
  styleUrls: ['updateproduct.page.scss']
})
export class UpdateProductPage implements OnInit {
  productname: "";
  unittype: "";
  price: "";
  producttype: ""; 
  qty:"";
  description: "";
  itemimagess: "";
  status:1;
  productimage = '/assets/store.png';
  iamgefile="";
  keyprodid = "";
  constructor(public activatedRoute: ActivatedRoute, public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    var self = this;
    this.keyprodid = this.activatedRoute.snapshot.paramMap.get('id');

    this.util.getproductsbyid2(this.keyprodid,(element)=>{ 
      element.forEach(element => {
        self.productimage = element.itemimg;
        self.productname = element.productname;
        self.unittype = element.unittype;
        self.qty = element.qty;
        self.price = element.price;
        self.productimage = element.itemimg;
        self.iamgefile  = element.itemimg;
        self.producttype = element.producttype;
        self.util.selecteduserkey = element.ukey;
        self.util.selecteditem = element.key;
        self.description = element.description;
        self.status = element.status;
      });
    });
  }
  ngOnInit() {
  }
  submit(){
    if (typeof(this.productname) != 'undefined' &&
        typeof(this.price) != 'undefined' &&
        typeof(this.producttype) != 'undefined' &&
        typeof(this.unittype) != 'undefined' &&
        typeof(this.qty) != 'undefined' &&
        typeof(this.description) != 'undefined'){
      if (this.productname != "" && this.price != ""){
        this.util.updateproduct(this.keyprodid ,{
          'productname': this.productname,
          'unittype': this.unittype,
          'price': this.price,
          'qty': this.qty,
          'producttype': this.producttype,
          'description': this.description,
          'status': this.status
        });
        this.util.alerts("Update Product","Product Added",['Ok']);
        this.util.menuRouting('/home');
      } else {
        this.util.alerts("Update","Please fill required text",['Ok']);
      }
    }else {
      this.util.alerts("Update","Please fill required text",['Ok']);
    }
  }
  fileChange(event){ 
    var self = this;
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.productimage = event.target.result;        
        this.iamgefile = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      setTimeout(function(){
        self.updateimage();
      },1500)

    } 
  }
  updateimage(){
    var self = this;
    self.util.updateproduct(this.keyprodid ,{
        "itemimg": typeof(self.iamgefile) != 'undefined'?self.iamgefile:'none'
    });
    // self.navigate();
    // self.util.alerts("General","Profle Image is Updated",['Ok']);
  }
}
