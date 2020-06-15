import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Story } from "src/app/_models/story";
import { StoryService } from "src/app/_services/story.service";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "src/app/_services/alertify.service";

@Component({
  selector: "app-story-card2",
  templateUrl: "./story-card2.component.html",
  styleUrls: ["./story-card2.component.css"],
})
export class StoryCard2Component implements OnInit {
  @Input() story: Story;
  @Output() removeStory = new EventEmitter();
  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  onStoryDelete(id: number) {
    this.removeStory.emit();
  }
}
