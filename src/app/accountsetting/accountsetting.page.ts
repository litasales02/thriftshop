import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-home',
  templateUrl: 'accountsetting.page.html',
  styleUrls: ['accountsetting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  acountstatus = "In-Active";
  storeimagestatus = "None";
  validgorvermentidstatus = "None";
  govid="";
  storeimg="";
  validgorvermentidimage = '/assets/store.png';
  storeimage = '/assets/store.png';
  idtype: "";
  storemapstatus = 'None';
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
  }
  submit(){
    if (typeof(this.storeimg) != 'undefined' && typeof(this.govid) != 'undefined' && typeof(this.idtype) != 'undefined'){
        if(this.storemapstatus == "None"){
          this.util.ShowToast("Please Update your Store Map Location");
        }
        this.util.updaterequirements({ 
          'status': 0,
          'govid': this.govid,
          'storeimg':this.storeimg
        });
        this.util.alerts("Update","Store Updated!, Please wait for the comformation of your registration or call us. Thank you!.",['Ok']);
        this.util.menuRouting('/home');
    }else {
      this.util.alerts("Update","Please fill required text2",['Ok']);
    }
  }
  ngOnInit() {}
  fileChange(event){ 
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.validgorvermentidimage = event.target.result;        
        this.govid = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  fileChange2(event){ 
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.storeimage = event.target.result;        
        this.storeimg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
