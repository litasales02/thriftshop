import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
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
  constructor(private firebase: Firebase) {

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    async function presentAlert() {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();
    
      const alert = await alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });
      return await alert.present();
    }

  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  dismiss(){
    // this.viewCtrl.dismiss();
  }

}
