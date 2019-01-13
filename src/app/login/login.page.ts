import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {  
  txtusername: "";
  txtpassword: "";
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent) {}
  submitlogin(){
    if( typeof(this.txtusername) != 'undefined' && typeof(this.txtpassword) != 'undefined' ){
      this.util.login(this.txtusername,this.txtpassword);
    } else {
      this.util.alerts('Login','Username or password didnot same',['ok']);
    }
  }
  ngOnInit() {
  } 
  navigate() {
    this.router.navigate(['/home']);
  }
}
