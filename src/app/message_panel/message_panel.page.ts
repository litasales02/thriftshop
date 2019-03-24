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
  userdata = null;
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
        self.util.getstorebyid(this.id,function(data){
          console.log(data); 
            self.userdata = Object.values(data)[0];
            // console.log( self.userdata); 
            // self.sellerstorename = self.userdata['storename'];
            // self.selleraddress1 = self.userdata['address1'];
            // self.selleraddress2 = self.userdata['address2'];
            // self.sellerfirstname = self.userdata['firstname'];
            // self.sellerlastname = self.userdata['lastname'];
            // self.sellermiddlename = self.userdata['middlename'];

            // self.cellnumber = self.userdata['cellnumber'];
            // self.telnumber = self.userdata['telnumber'];
            // self.emails = self.userdata['email'];
            // self.productimage = self.userdata['profileimg'];
            // this.util.usersendmsgbysellers(this.id,messagess,function(d){ 
            //     try {
            //       self.content.scrollToBottom(300); 
            //     }catch(e){
      
            //     }
            // });

        });
      }else{
        this.parentroute = "messages";
      }
      setInterval(function(){
        if(self.util.messagechange){
          self.util.messagechange = false;
          self.content.scrollToBottom(300);
        }
      },1000);
  }
  sendmsg(){ 
    var self = this; 
    if(typeof(this.messagess) != 'undefined' && this.messagess != ''){
      this.util.usersendmsg(this.id,this.messagess,function(d){ 
          try {
            self.content.scrollToBottom(300); 
          }catch(e){

          }
      });
      self.messagess = "";
    }
  }
  ngOnInit() {
    this.content.scrollToBottom(300); 
  }


  async actionfilterproductavailable() {
    var self = this;
    var messagess;
    const actionSheet = await this.actionSheetController.create({
      header: 'Frequently asked Question',
      buttons: [{
        text: 'When will be the item be available?',  
        handler: () => { 
          this.util.usersendmsg(self.id,"When will be the item be available",function(d){ 
              try {
                self.content.scrollToBottom(300); 
              }catch(e){
    
              }
          });
          this.util.usersendmsgbysellers(self.id,"We restock the bundle item every after 1 month",function(d){ 
              try {
                self.content.scrollToBottom(300); 
              }catch(e){
    
              }
          });
        }
      },{
        text: 'Whom to contact',  
        handler: () => { 
          this.util.usersendmsg(self.id,"Whom to contact",function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
        }); 
        this.util.usersendmsgbysellers(self.id,"Please Call " + self.userdata['cellnumber'] + " and look for " +  self.userdata['firstname'],function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
        });
        }
      },{
        text: 'Location?',  
        handler: () => { 
          this.util.usersendmsg(self.id,"Location?",function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
        });       
        this.util.usersendmsgbysellers(self.id,"Store Address " + self.userdata['address1'] + " or " + self.userdata['address2'],function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
        });
        }
      },{
        text: 'Business Hours',  
        handler: () => { 
          this.util.usersendmsg(self.id,"Business Hours",function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
          });       
          this.util.usersendmsgbysellers(self.id,"8:00am to 5:00pm",function(d){ 
              try {
                self.content.scrollToBottom(300); 
              }catch(e){
    
              }
          });
        }
      },{
        text: 'Is this negotiable?',  
        handler: () => { 
          this.util.usersendmsg(self.id,"Is this negotiable?",function(d){ 
            try {
              self.content.scrollToBottom(300); 
            }catch(e){
  
            }
          });       
          this.util.usersendmsgbysellers(self.id,"Yes, Depends on the product. Contact me anytime",function(d){ 
              try {
                self.content.scrollToBottom(300); 
              }catch(e){
    
              }
          });
        }
      }]
    });
    await actionSheet.present();
  }
}
