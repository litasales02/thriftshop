import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'createproduct.page.html',
  styleUrls: ['createproduct.page.scss']
})
export class CreateProductPage implements OnInit {
  productname: "";
  unittype: "";
  price: "";
  producttype: ""; 
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    if (this.util.userid == ''){
      this.util.menuRouting('/login');
    }
  }
  ngOnInit() {
  }
  submit(){
    if (typeof(this.productname) != 'undefined' &&
        typeof(this.price) != 'undefined' &&
        typeof(this.producttype) != 'undefined' &&
        typeof(this.unittype) != 'undefined'){
      if (this.productname != "" && this.price != ""){
        this.util.updatedata({  
          'product':[
            {
              'productname': this.productname,
              'unittype': this.unittype,
              'price': this.price,
              'producttype': this.producttype
            }
          ]
        });
        this.util.alerts("New Product","Product Added",['Ok']);
      } else {
        this.util.alerts("Add New","Please fill required text1",['Ok']);
      }
    }else {
      this.util.alerts("Add New","Please fill required text2",['Ok']);
    }
  }
}
