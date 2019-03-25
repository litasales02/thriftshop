import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 


@Component({
  selector: 'app-list',
  templateUrl: 'storedetails.page.html',
  styleUrls: ['storedetails.page.scss']
})
export class StoreDetailsPage implements OnInit {
  sellerstorename: String = "";
  selleraddress1: String = "";
  selleraddress2: String = "";
  sellername: String = ""; 
  cellnumber: String = "";
  telnumber: String = "";
  ownername: String = "";
  emails: String = "";
  id: string = "";
  child: string = "";
  img: string = "";
  stars = null;
  rate = 0.0;
  kanoevaluation =  {      
    total_users :0,
    total_stars: 0,  
    quality:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    suplier:  {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    feedback: {m:0,a:0,o:0,i:0,r:0,si:0,di:0,asc:0},
    si: 0,
    di: 0,
    asc: 0
  };
  btndirectrate = '/login';
  star = '/assets/unhart.png'; 
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.child = this.activatedRoute.snapshot.paramMap.get('child');
    this.util.storedata.forEach(element => { 
      if ( element.key == this.id ){
        var firstname = element.userdetails.firstname;
        var lastname =   element.userdetails.lastname;
        this.sellerstorename = element.storename;
        this.selleraddress1 = element.userdetails.address1;
        this.selleraddress2 = element.userdetails.address2;
        
        this.cellnumber = element.userdetails.cellnumber;
        this.telnumber = element.userdetails.telnumber;
        this.emails = element.userdetails.email;
        this.ownername = firstname.concat(" " + lastname);
        this.img = element.userdetails.profileimg;
        this.kanoevaluation = this.util.kanoalgov2(element.key); 

        this.rate = this.kanoevaluation.asc;
        this.stars =  this.kanoevaluation.total_stars
        this.util.updatedataset(element.key,{
          totalStars: this.kanoevaluation.total_stars,
          rates: this.kanoevaluation.asc
        });
        //console.log(this.kanoevaluation);
      }
    });
    if(this.util.loginStatus){
      this.btndirectrate = '/questioner/' + this.id;
    }
  }

  ngOnInit() {

  }

  loadmymap(){
    this.util.menuRouting('storemap/' + this.id);    
  }
}
