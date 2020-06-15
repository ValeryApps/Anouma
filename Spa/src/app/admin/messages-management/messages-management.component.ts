import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../_services/message.service";
import {ActivatedRoute} from "@angular/router";
import {AlertifyService} from "../../_services/alertify.service";
import {Message} from "../../_models/message";

@Component({
  selector: 'app-messages-management',
  templateUrl: './messages-management.component.html',
  styleUrls: ['./messages-management.component.css']
})
export class MessagesManagementComponent implements OnInit {
messages:Message[];
  constructor(private msgService:MessageService) { }

  ngOnInit(): void {
   this.loadMessages();
  }
 loadMessages(){
    this.msgService.retrieveMessages().subscribe((msg:Message[])=>{
      this.messages = msg;
    })
 }
}
