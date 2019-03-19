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
  stars = [];
  rate = 0.0;
  kanoevaluation =  {      
    total_users :0,
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
  };;
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
        this.rate = Number(this.kanoevaluation.total_stars.toFixed(1)); 
        this.stars =  Array(((100 * this.kanoevaluation.total_stars) / 25) | 0).map((x,i)=>i);
        this.util.updatedataset(element.key,{
          totalStars: this.kanoevaluation.total_stars
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
