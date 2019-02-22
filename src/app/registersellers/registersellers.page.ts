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
    var results = this.util.getuserlogbyname(this.sellerusername,(result)=>{
      return result;
      // if(result){        
      //   this.util.alerts("Add New","Username is already used",['Ok']); 
      // } else {
      //    if (typeof(this.sellerstorename) != 'undefined' && 
      //   typeof(this.selleraddress1) != 'undefined' && 
      //   typeof(this.selleraddress2) != 'undefined' && 
      //   typeof(this.sellerfirstname) != 'undefined'  && 
      //   typeof(this.sellerlastname) != 'undefined'  && 
      //   typeof(this.sellermiddlename) != 'undefined' && 
      //   typeof(this.sellerusername) != 'undefined' && 
      //   typeof(this.sellerpassword) != 'undefined' ){
      //     if (typeof(this.sellerpassword) != 'undefined' && typeof(this.sellerrepassword) != 'undefined' && this.sellerrepassword == this.sellerpassword){
      //       this.util.newdata({
      //         'userdetails': { 
      //           'address1': this.selleraddress1!=""?this.selleraddress1:'none', 
      //           'address2': this.selleraddress2!=""?this.selleraddress2:'none', 
      //           'firstname': this.sellerfirstname!=""?this.sellerfirstname:'none', 
      //           'lastname': this.sellerlastname!=""?this.sellerlastname:'none', 
      //           'middlename': this.sellermiddlename!=""?this.sellermiddlename:'none',
      //           'cellnumber': this.cellnumber!=""?this.cellnumber:'none',
      //           'telnumber': typeof(this.telnumber) != 'undefined'?this.telnumber:'none',
      //           'email': typeof(this.emails) != 'undefined'?this.emails:'none',
      //           "profileimg": typeof(this.iamgefile) != 'undefined'?this.iamgefile:'none'
      //         },
      //         'usertype': 'seller',
      //         'username': this.sellerusername!=""?this.sellerusername:'none', 
      //         'password': this.sellerpassword!=""?this.sellerpassword:'none',
      //         'storename': this.sellerstorename!=""?this.sellerstorename:'none',
      //         'requirements' : { 
      //           'status': 0,
      //           'govid': 'None',
      //           'storeimg':'None'
      //         },
      //         'geodata': {
      //           'status': 1,
      //           'lat': '0.0',
      //           'lng': '0.0'
      //         }
      //       });
      //       this.navigate();
      //     } else if (typeof(this.sellerpassword) != 'undefined' && typeof(this.sellerrepassword) && (this.sellerrepassword.length < 6 || this.sellerpassword.length < 6 )) {
      //       this.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
      //     }else {
      //       this.util.alerts("Add New","User password did not equal",['Ok']);
      //     }
      //   } else {
      //   }
      // }
    });
    
    console.log(results);
   
  }
  navigate() {
    this.router.navigate(['/home']);
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
