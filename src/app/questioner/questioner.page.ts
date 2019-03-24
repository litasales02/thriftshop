import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-list',
  templateUrl: 'questioner.page.html',
  styleUrls: ['questioner.page.scss']
})
export class QuestionerPage implements OnInit {
  part1: "";
  part11: "";
  part2: "";
  part22: "";
  part3: "";
  part33: "";
  id = "";
  constructor(public activatedRoute: ActivatedRoute,public router: Router, public alertCtrl: AlertController,private util: AppComponent) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.util.userid == ''){
      this.util.menuRouting('/login');
    }
  }
  ngOnInit() {

  }
  submit(){
    console.log("part1 ",this.part1);
    console.log("part11 ",this.part11);

    console.log("part2 ",this.part2);
    console.log("part22 ",this.part22);
    
    console.log("part3 ",this.part3);
    console.log("part33 ",this.part33); 

  // 1.	It is excellent = e
  // 2.	It is good = g
  // 3.	It is average = a
  // 4.	It is bad = b
  // 5.	It is poor = p


    // console.log("id ",this.id);

    if (typeof(this.part1) != 'undefined' &&
        typeof(this.part11) != 'undefined' &&
        typeof(this.part2) != 'undefined' &&
        typeof(this.part22) != 'undefined' &&
        typeof(this.part3) != 'undefined' &&
        typeof(this.part33) != 'undefined'){

        this.util.updatenewkanodata(this.id,{
          'Q1P1': this.part1,
          'Q1P2': this.part11,
          'Q2P1': this.part2,
          'Q2P2': this.part22,
          'Q3P1':this.part3,
          'Q3P2':this.part33
        });
        this.util.kanoalgo(this.id);
        this.util.alerts("Feed Back","Thank you!.",['Ok']);
        this.util.menuRouting('/home');
    }else {
      this.util.alerts("Feed Back","Need to finish all question",['Ok']);
    }
  }
}
