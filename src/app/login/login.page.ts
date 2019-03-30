import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 
// import { setFlagsFromString } from 'v8';

@Component({
  selector: 'app-list',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {  
  txtusername: "";
  txtpassword: "";
  public isDisabled = false;
  count = 0;
  seennot = "eye-off";
  typtexts = "password";
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    // this.util.logstatus();
    this.util.menudisabled();
    this.util.dijkstrafunction([7.138419523108726,125.53915832519531],[0,0],(data)=>{
      console.log(data);
    })
  }
  async submitlogin(){ 
    // console.log(this.util.md5function(this.txtusername));
    console.log(this.util.countloop);
    var self = this; 
    this.isDisabled = true;
    // this.util.presentLoadingWithOptions();
    const loading = await this.util.loadingController.create({
      spinner: null, 
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    if( typeof(this.txtusername) != 'undefined' && typeof(this.txtpassword) != 'undefined' ){     
      await loading.present(); 
      if (this.txtusername != "" && this.txtpassword != "") { 
        await this.util.login(this.txtusername,this.txtpassword,function(returns){
          if (returns){
            self.util.ShowToast('Welcome ' + self.util.drawerTitle + '!.');
            self.count++;
            if(self.util.requirementsdata.status == 0 && self.count == 1 && self.util.userType == "seller"){
              self.util.alerts2("Registration","Please update your requirements to update your registration and all your product's will show.",['Ok']);
            }
            loading.dismiss();
            self.util.menuenable();
            self.navigate();
          } else {
            loading.dismiss();
            self.alerts('Login','Invalid Username or password.',['ok']);
            self.isDisabled = false;
          } 
        }); 
      } else {
        loading.dismiss();
        self.alerts('Login','Please fill all textbox.',['ok']); 
        self.isDisabled = false;
      }
    } else {
      loading.dismiss();
      self.alerts('Login','Invalid Username or password.',['ok']); 
      self.isDisabled = false;
    }
  }
  public alerts(title,header,buttons){
    this.util.alerts(title,header,buttons);
  }
  ngOnInit() {
  } 
  seenot(){
    if(this.seennot=="eye-off"){
      this.seennot="eye";
      this.typtexts= "text";
    }else{
      this.seennot="eye-off";
      this.typtexts= "password";
    }
  }
  navigate() {
    this.router.navigate(['/home']);
  }
}
