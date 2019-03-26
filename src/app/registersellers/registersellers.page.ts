import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'registersellers.page.html',
  styleUrls: ['registersellers.page.scss']
})
export class RegisterSellersPage implements OnInit {
  
  sellerstorename: "";
  selleraddress1: "";
  selleraddress2: "";
  sellerfirstname: "";
  sellerlastname: "";
  sellermiddlename: "";
  sellerusername: "";
  sellerpassword: "";
  sellerrepassword: "";
  
  cellnumber: "";
  telnumber: "";
  emails: "";
  productimage = '/assets/store.png';
  iamgefile="";
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {}
  ngOnInit() {}
  submitdata(){
    var x = 0;  
    var self = this;
    this.util.getuserlogbyname(this.sellerusername,function(result){
      if(result){        
        self.util.alerts("Sorry","Username is already used",['Ok']); 
      } else {
         if (typeof(self.sellerstorename) != 'undefined' && 
            typeof(self.selleraddress1) != 'undefined' && 
            typeof(self.selleraddress2) != 'undefined' && 
            typeof(self.sellerfirstname) != 'undefined'  && 
            typeof(self.sellerlastname) != 'undefined'  && 
            typeof(self.sellermiddlename) != 'undefined' && 
            typeof(self.sellerusername) != 'undefined' && 
            typeof(self.sellerpassword) != 'undefined' ){
          if (typeof(self.sellerpassword) != 'undefined' && typeof(self.sellerrepassword) != 'undefined' && self.sellerrepassword == self.sellerpassword){
            self.util.newdata({
              'userdetails': { 
                'address1': self.selleraddress1!=""?self.selleraddress1:'none', 
                'address2': self.selleraddress2!=""?self.selleraddress2:'none', 
                'firstname': self.sellerfirstname!=""?self.sellerfirstname:'none', 
                'lastname': self.sellerlastname!=""?self.sellerlastname:'none', 
                'middlename': self.sellermiddlename!=""?self.sellermiddlename:'none',
                'cellnumber': self.cellnumber!=""?self.cellnumber:'none',
                'telnumber': typeof(self.telnumber) != 'undefined'?self.telnumber:'none',
                'email': typeof(self.emails) != 'undefined'?self.emails:'none',
                "profileimg": typeof(self.iamgefile) != 'undefined'?self.iamgefile:'none'
              },
              'usertype': 'seller',
              'username': self.sellerusername!=""?self.sellerusername:'none', 
              'password': self.util.md5function(self.sellerpassword),
              'storename': self.sellerstorename!=""?self.sellerstorename:'none',
              'requirements' : { 
                'status': 0,
                'govid': 'None',
                'storeimg':'None'
              },
              'geodata': {
                'status': 1,
                'lat': '0.0',
                'lng': '0.0'
              }
            });
            self.navigate();            
            self.util.alerts("Congrats!","You are now registered. You may login now and please update your requirements to activate your account. Thank you.",['Ok']);
          } else if (typeof(self.sellerpassword) != 'undefined' && typeof(self.sellerrepassword) && (self.sellerrepassword.length < 6 || self.sellerpassword.length < 6 )) {
            self.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
          }else {
            self.util.alerts("Add New","User password did not equal",['Ok']);
          }
        } else {
        }
      }
    });
    
   
  }
  navigate() {
    this.router.navigate(['/login']);
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
