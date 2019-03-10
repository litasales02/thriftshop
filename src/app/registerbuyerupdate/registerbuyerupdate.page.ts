import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'registerbuyerupdate.page.html',
  styleUrls: ['registerbuyerupdate.page.scss']
})
export class RegisterBuyerUpdatePage implements OnInit {
  private selectedItem: any; 
  buyeraddress: "";
  buyerfirstname: "";
  buyerlastname: "";
  buyermiddlename: "";
  buyerusername: "";
  buyerpassword: "";
  buyerrepass: "";

  cellnumber: "";  
  emails: "";  
  productimage = '/assets/store.png';
  iamgefile="";
  userdata = null;
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    var self = this;
    this.util.getstorebyid(this.util.userid,function(data){ 
      self.userdata = Object.values(data)[0];
      console.log( self.userdata);
 
      self.buyeraddress = self.userdata['address']; 
      self.buyerfirstname = self.userdata['firstname'];
      self.buyerlastname = self.userdata['lastname'];
      self.buyermiddlename = self.userdata['middlename'];

      self.cellnumber = self.userdata['cellnumber']; 
      self.emails = self.userdata['email'];



    });
  }
  ngOnInit() {}
  submitdata(){
    var self = this;
    this.util.getuserlogbyname(this.buyerusername,function(result){
      if(result){        
        self.util.alerts("Sorry","Username is already used",['Ok']); 
      } else {
        if (typeof(this.buyeraddress) != 'undefined' && typeof(this.buyerfirstname) != 'undefined' && typeof(this.buyerlastname) != 'undefined' && typeof(this.buyermiddlename) != 'undefined'  ){
          this.util.newdata({
            'userdetails': {  
              'address': typeof(this.buyeraddress) != 'undefined'?this.buyeraddress:'none',
              'firstname': typeof(this.buyerfirstname) != 'undefined'?this.buyerfirstname:'none', 
              'lastname': typeof(this.buyerlastname) != 'undefined'?this.buyerlastname:'none', 
              'middlename': typeof(this.buyermiddlename) != 'undefined'?this.buyermiddlename:'none',
              'cellnumber': typeof(this.cellnumber) != 'undefined'?this.cellnumber:'none', 
              'email':typeof(this.emails) != 'undefined'? this.emails:'none',
            }
          });
          this.navigate();
        } else {    
          this.erroralert();
        }        
      }
    });

    
  }
  async erroralert() { 
    const alert = await this.alertCtrl.create({
      header: 'Add New',
      subHeader: 'Please fill all required.',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.' + this.buyeraddress,
      buttons: ['OK']
    })
    await alert.present();
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
