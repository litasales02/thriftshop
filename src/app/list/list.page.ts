import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'
>>>>>>> develop

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
<<<<<<< HEAD
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
=======
 
  userlist = [];
  constructor(public router: Router, public alertCtrl: AlertController,private util: AppComponent){
    this.userlist = this.util.storedata;
    // console.log(this.userlist);
>>>>>>> develop
  }

  ngOnInit() {
  }
<<<<<<< HEAD
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
=======
 
>>>>>>> develop
}
