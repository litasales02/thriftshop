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
  kanorating = {
    total_users:0,
    total_stars: 0,
    total_excellentn: 0,
    total_averagen: 0,
    total_goodn: 0,
    total_badn: 0,
    total_poorn: 0,
    total_excellentp: 0,
    total_averagep: 0,
    total_goodp: 0,
    total_badp: 0,
    total_poorp: 0,
    quality:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    suplier:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    feedback: {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    si: 0,
    di: 0,
    asc: 0
  }
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {      
     this.kanorating = this.util.kanorating;

  }

  ngOnInit() { 
    this.kanorating = this.util.kanorating;
  }
}
