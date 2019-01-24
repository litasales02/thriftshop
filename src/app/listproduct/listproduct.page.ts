import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'listproduct.page.html',
  styleUrls: ['listproduct.page.scss']
})
export class ListProductPage implements OnInit { 
  id: string = "";
  child: string = "";
  default_redirect: string = "home";
  data = null;
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) {
      try {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.child = this.activatedRoute.snapshot.paramMap.get('child');
        var child = "";
        if ( this.child == "storedetailshome"){
          child = "/list/storedetails/" + this.id + "/home";
        }
        this.default_redirect = child;
      }catch(er){

      }
      this.util.getproducts(this.id);
      // console.log(this.util.productdata);
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
