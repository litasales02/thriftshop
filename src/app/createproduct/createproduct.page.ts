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
  qty:"";
  description: "";
  productimage = '/assets/store.png';
  iamgefile="";
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    if (this.util.userid == ''){
      this.util.menuRouting('/login');
    } else if( this.util.userid != '' && this.util.requirementsdata.status == 1) {   
      this.util.alerts('Hi','Please update your requirements first before you create products.',['ok']);   
      this.util.menuRouting('/home');
    }
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
        this.util.updatenewproduct({
          'productname': this.productname,
          'unittype': this.unittype,
          'price': this.price,
          'qty': this.qty,
          'producttype': this.producttype,
          'itemimg':this.iamgefile,
          'description': this.description
        });
        this.util.alerts("New Product","Product Added",['Ok']);
        this.util.menuRouting('/home');
      } else {
        this.util.alerts("Add New","Please fill required text",['Ok']);
      }
    }else {
      this.util.alerts("Add New","Please fill required text",['Ok']);
    }
  }
  fileChange(event){ 
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.productimage = event.target.result;        
        this.iamgefile = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      // let fileList: FileList = event.target.files;  
      // let file: File = fileList[0];
      // this.iamgefile = file;
  }
}
