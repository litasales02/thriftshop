import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'registerbuyer.page.html',
  styleUrls: ['registerbuyer.page.scss']
})
export class RegisterBuyerPage implements OnInit {
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
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {}
  ngOnInit() {}
  submitdata(){
    var self = this;
    this.util.getuserlogbyname(this.buyerusername,function(result){
      if(result){        
        self.util.alerts("Sorry","Username is already used",['Ok']); 
      } else {
        if (typeof(self.buyeraddress) != 'undefined' && typeof(self.buyerfirstname) != 'undefined' && typeof(self.buyerlastname) != 'undefined' && typeof(self.buyermiddlename) != 'undefined'  && typeof(self.buyerusername) != 'undefined'  && typeof(self.buyerpassword) != 'undefined' && typeof(self.buyerrepass) != 'undefined' ){
          if (typeof(self.buyerpassword) != 'undefined' && typeof(self.buyerrepass) != 'undefined' && self.buyerpassword == self.buyerrepass){
            self.util.newdata({
              'userdetails': {  
                'address': typeof(self.buyeraddress) != 'undefined'?self.buyeraddress:'none',
                'firstname': typeof(self.buyerfirstname) != 'undefined'?self.buyerfirstname:'none', 
                'lastname': typeof(self.buyerlastname) != 'undefined'?self.buyerlastname:'none', 
                'middlename': typeof(self.buyermiddlename) != 'undefined'?self.buyermiddlename:'none',
                'cellnumber': typeof(self.cellnumber) != 'undefined'?self.cellnumber:'none', 
                'email':typeof(self.emails) != 'undefined'? self.emails:'none',
                "profileimg": typeof(self.iamgefile) != 'undefined'?self.iamgefile:'none'
              },
              'usertype': 'buyer',
              'username': self.buyerusername, 
              'password': self.buyerpassword,
              'stores':[]});
              self.navigate();
          } else if (typeof(self.buyerpassword) != 'undefined' && typeof(self.buyerusername) && (self.buyerpassword.length < 6 || self.buyerusername.length < 6 )) {
            self.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
          }else {
            self.util.alerts("Add New","User password did not equal",['Ok']);
          }
        } else {    
          self.erroralert();
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
