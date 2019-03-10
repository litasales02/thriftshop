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
  productimage = '/assets/store.png';
  iamgefile="";
  keyprodid = "";
  constructor(public activatedRoute: ActivatedRoute, public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    var self = this;
    this.keyprodid = this.activatedRoute.snapshot.paramMap.get('id');

    this.util.getproductsbyid2(this.keyprodid,(element)=>{ 
      element.forEach(element => {
        this.productimage = element.itemimg;
        this.productname = element.productname;
        this.unittype = element.unittype;
        this.price = element.price;
        this.producttype = element.producttype;
        self.util.selecteduserkey = element.ukey;
        self.util.selecteditem = element.key;
        self.description = element.description;
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
          'itemimg':this.iamgefile,
          'description': this.description
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

      this.util.updateproduct(self.keyprodid ,{ 
        'itemimg':self.iamgefile, 
      });

    } 
  }
}
