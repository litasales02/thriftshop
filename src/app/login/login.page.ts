import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AlertController } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 
>>>>>>> develop

@Component({
  selector: 'app-list',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
<<<<<<< HEAD
export class LoginPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
=======
export class LoginPage implements OnInit {  
  txtusername: "";
  txtpassword: "";
  public isDisabled = false;
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
       
  }
  async submitlogin(){
    var self = this; 
    this.isDisabled = true;
    if( typeof(this.txtusername) != 'undefined' && typeof(this.txtpassword) != 'undefined' ){      
      if (this.txtusername != "" && this.txtpassword != "") { 
        await this.util.login(this.txtusername,this.txtpassword,function(returns){
          if (returns){
            self.util.ShowToast('Welcome User!.');
            self.navigate();
          } else {
            self.alerts('Login','Invalid Username or password.',['ok']);
            self.isDisabled = false;
          } 
        }); 
      } else {
        self.alerts('Login','Please fill all textbox.',['ok']); 
        self.isDisabled = false;
      }
    } else {
      self.alerts('Login','Invalid Username or password.',['ok']); 
      self.isDisabled = false;
    }
  }
  public alerts(title,header,buttons){
    this.util.alerts(title,header,buttons);
  }
  ngOnInit() {
  } 
  navigate() {
    this.router.navigate(['/home']);
  }
>>>>>>> develop
}
