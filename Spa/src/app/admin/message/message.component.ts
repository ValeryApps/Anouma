import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
msg:Message;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.msg = data['msg'];
    })
  }

}
