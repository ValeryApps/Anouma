import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Story} from "../../_models/story";
import {StoryService} from "../../_services/story.service";
import {ActivatedRoute} from "@angular/router";
import {AlertifyService} from "../../_services/alertify.service";

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {
@Input() story:Story;
@Output() removeStory = new EventEmitter();
  constructor(private storyService:StoryService, private route:ActivatedRoute, private alertify:AlertifyService) { }

  ngOnInit(): void {

  }
  onStoryDelete(id:number){
    this.removeStory.emit();
  }
}
