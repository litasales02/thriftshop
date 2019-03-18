import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'revieweratings.page.html',
  styleUrls: ['revieweratings.page.scss']
})
export class RevieweRatingsPage implements OnInit {
  routerlingks = "";
  id = "";
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {      
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
}
