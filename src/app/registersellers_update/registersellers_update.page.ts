import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 
import { NullTemplateVisitor } from '@angular/compiler';


@Component({
  selector: 'app-list',
  templateUrl: 'registersellers_update.page.html',
  styleUrls: ['registersellers_update.page.scss']
})
export class RegisterSellersPageUpdate implements OnInit {
  
  sellerstorename: "";
  selleraddress1: "";
  selleraddress2: "";
  sellerfirstname: "";
  sellerlastname: "";
  sellermiddlename: "";

  cellnumber: "";
  telnumber: NullTemplateVisitor
  emails: "";
  productimage = '/assets/store.png';
  iamgefile=""; 
  userdata = null;
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    var self = this;
    this.util.getstorebyid(this.util.userid,function(data){
      
      self.userdata = Object.values(data)[0];
      console.log( self.userdata);

      self.sellerstorename = self.userdata['storename'];
      self.selleraddress1 = self.userdata['address1'];
      self.selleraddress2 = self.userdata['address2'];
      self.sellerfirstname = self.userdata['firstname'];
      self.sellerlastname = self.userdata['lastname'];
      self.sellermiddlename = self.userdata['middlename'];

      self.cellnumber = self.userdata['cellnumber'];
      self.telnumber = self.userdata['telnumber'];
      self.emails = self.userdata['email'];
      self.productimage = self.userdata['profileimg'];

    });
  }
  ngOnInit() {

  }
  submitdata(){
    var x = 0;  
    var self = this;
 
    if (typeof(self.sellerstorename) != 'undefined' && 
      typeof(self.selleraddress1) != 'undefined' && 
      typeof(self.selleraddress2) != 'undefined' && 
      typeof(self.sellerfirstname) != 'undefined'  && 
      typeof(self.sellerlastname) != 'undefined'  && 
      typeof(self.sellermiddlename) != 'undefined'){
        self.util.updateuserdatadetails({
        'address1': self.selleraddress1!=""?self.selleraddress1:'none', 
        'address2': self.selleraddress2!=""?self.selleraddress2:'none', 
        'firstname': self.sellerfirstname!=""?self.sellerfirstname:'none', 
        'lastname': self.sellerlastname!=""?self.sellerlastname:'none', 
        'middlename': self.sellermiddlename!=""?self.sellermiddlename:'none',
        'cellnumber': self.cellnumber!=""?self.cellnumber:'none',
        'telnumber': typeof(self.telnumber) != 'undefined'?self.telnumber:'none',
        'email': typeof(self.emails) != 'undefined'?self.emails:'none'
      });
      // self.navigate();
      self.util.alerts("General","User Details Updated",['Ok']);
    } else {
      self.util.alerts("General","Please fill all required text",['Ok']);
    }
  }
  navigate() {
    this.router.navigate(['/home']);
  }
  fileChange(event){
    var self = this; 
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.productimage = event.target.result;        
        this.iamgefile = event.target.result;
        self.util.profileimg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      // let fileList: FileList = event.target.files;  
      // let file: File = fileList[0];
      // this.iamgefile = file;
    setTimeout(function(){
      self.updateimage();
    },1200);
  }

  updateimage(){
    var self = this;
    self.util.updateuserdatadetails({
      "profileimg": typeof(self.iamgefile) != 'undefined'?self.iamgefile:'none'
    });
    // self.navigate();
    self.util.alerts("General","Profle Image is Updated",['Ok']);
  }

}
