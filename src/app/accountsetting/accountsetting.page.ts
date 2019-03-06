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
  storemapstatus = "Not Set"
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    
    this.util.load_user_requirements();
      // console.log(this.util.requirementsdata);
      this.idtype = this.util.requirementsdata.idtype;
      this.acountstatus = this.util.requirementsdata.status == 0?'In-Active':'Active';
      this.validgorvermentidstatus = this.util.requirementsdata.govid == null?'None':'Validated'; 
      this.idtype = this.util.requirementsdata.idtype; 
      this.storeimagestatus = this.util.requirementsdata.storeimg == null?'None':'Validated'; 
      this.storemapstatus = this.util.geodata == 1?'Already Set':'No Set';
  }
  submit(){
    if (typeof(this.storeimg) != 'undefined' && typeof(this.govid) != 'undefined' && typeof(this.idtype) != 'undefined'){
        if(this.util.geodata == 0){
          this.util.ShowToast("Please Update your Store Map Location");
          return;
        }
        if(this.govid != '' && this.storeimg != ''){
          this.util.updaterequirements({ 
            'status': 1,
            'idtype': this.idtype,
            'govid': this.govid,
            'storeimg':this.storeimg
          });          
          this.util.alerts("Update","Store Updated!, Please wait for the comformation of your registration or call us. Thank you!.",['Ok']);
        }

        if(this.util.geodata == 1){
          this.util.updategeodata({            
            'status': this.util.geodata,
            'lat': this.util.setgeolat, 
            'lng': this.util.setgeolong
          });
        }
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
