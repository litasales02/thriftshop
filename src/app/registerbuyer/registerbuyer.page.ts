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
    if (typeof(this.buyeraddress) != 'undefined' && typeof(this.buyerfirstname) != 'undefined' && typeof(this.buyerlastname) != 'undefined' && typeof(this.buyermiddlename) != 'undefined'  && typeof(this.buyerusername) != 'undefined'  && typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerrepass) != 'undefined' ){
      if (typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerrepass) != 'undefined' && this.buyerpassword == this.buyerrepass){
        this.util.newdata({
          'userdetails': {
            'address': typeof(this.buyeraddress) != 'undefined'?this.buyeraddress:'none',
            'firstname': typeof(this.buyerfirstname) != 'undefined'?this.buyerfirstname:'none', 
            'lastname': typeof(this.buyerlastname) != 'undefined'?this.buyerlastname:'none', 
            'middlename': typeof(this.buyermiddlename) != 'undefined'?this.buyermiddlename:'none',
            'cellnumber': typeof(this.cellnumber) != 'undefined'?this.cellnumber:'none', 
            'email':typeof(this.emails) != 'undefined'? this.emails:'none',
            "profileimg": typeof(this.iamgefile) != 'undefined'?this.iamgefile:'none'
          },
          'usertype': 'buyer',
          'username': this.buyerusername, 
          'password': this.buyerpassword,
          'stores':[]});
        this.navigate();
      } else if (typeof(this.buyerpassword) != 'undefined' && typeof(this.buyerusername) && (this.buyerpassword.length < 6 || this.buyerusername.length < 6 )) {
        this.util.alerts("Add New","User password must be minimum of 6 character",['Ok']);
      }else {
        this.util.alerts("Add New","User password did not equal",['Ok']);
      }
    } else {    
      this.erroralert();
    }
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
