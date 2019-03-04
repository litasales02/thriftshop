import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'messages.page.html',
  styleUrls: ['messages.page.scss']
})
export class MessagesPage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {

      


  }

  ngOnInit() {
  }

}
