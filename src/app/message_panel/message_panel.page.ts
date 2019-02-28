import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'message_panel.page.html',
  styleUrls: ['message_panel.page.scss']
})
export class Messages_panelPage implements OnInit {  
  id = "";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
    
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(util.usermessage, this.id );
  }

  ngOnInit() {
  }

}
