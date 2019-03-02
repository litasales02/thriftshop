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
  child = "";
  parentroute = "messages";
  messagess: "";  
  @ViewChild('content') content:any;
  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public alertCtrl: AlertController,
    private util: AppComponent,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) {
      var self = this;
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.child = this.activatedRoute.snapshot.paramMap.get('child');
      if(this.child == "products_details"){
        this.parentroute = "products/details/" + this.util.selecteditem;
      }else{
        this.parentroute = "messages";
      }
      // console.log(util.usermessage, this.id ); 
      // setInterval(function(){
      //   if(self.util.messagechange){
      //     self.util.messagechange = false;
      //     self.content.scrollToBottom(300);
      //   }
      // },1000) 

  }
  sendmsg(){ 
    var self = this;
    // console.log(this.id,this.messagess);
    if(typeof(this.messagess) != 'undefined' && this.messagess != ''){
      this.util.usersendmsg(this.id,this.messagess,function(d){
        self.messagess = "";
        setTimeout(()=>{
          self.content.scrollToBottom(300);
        },2000);
      });
    }
  }
  ngOnInit() {
    this.content.scrollToBottom(300);
    // this.util.usermessage.subscribe((e) => {
    //   console.log("item is change");
    // });
  }

}
