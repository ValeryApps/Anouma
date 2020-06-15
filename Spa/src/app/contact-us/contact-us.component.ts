import { Component, OnInit } from '@angular/core';
import {AlertifyService} from "../_services/alertify.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
message:any = {};
msgForm:FormGroup;
  constructor(private alertify:AlertifyService, private formBuilder:FormBuilder,
              private router:Router, private msgService:MessageService) { }

  ngOnInit(): void {
    this.CreateFormValidation();
  }
  CreateFormValidation() {
    this.msgForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderContact: ['', Validators.required],
      object: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

 sendMessage(){

   if(this.msgForm.valid){
     this.message = Object.assign({}, this.msgForm.value);
     this.msgService.sendMessage(this.message).subscribe(()=>{
       
     }, error => {
      this.alertify.success("Message successfully sent");
       this.router.navigate(['/']);
     })
   }
 }
  cancel(){
    this.router.navigate(['/'])
  }
}
