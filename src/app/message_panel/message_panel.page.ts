import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';   
@Component({ 
  templateUrl: 'message_panel.page.html',
  styleUrls: ['message_panel.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class Messages_panelPage implements OnInit {  
  id = "";
  messagess: "";  
  @ViewChild('content') content:any;
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
    
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(util.usermessage, this.id ); 
      // setInterval(function(){
      // },1000) 
  }
  sendmsg(){ 
    var self = this;
    if(typeof(this.messagess) != 'undefined' && this.messagess != ''){
      this.util.usersendmsg(this.id,this.messagess,function(d){
        self.messagess = "";
        setTimeout(()=>{
          self.content.scrollToBottom(300);
        },2000)
      });
    }
  }
  ngOnInit() {
    this.content.scrollToBottom(300);
  }

}
