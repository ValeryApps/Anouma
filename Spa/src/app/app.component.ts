import { Component, OnInit } from "@angular/core";
import { getDate } from "ngx-bootstrap/chronos/utils/date-getters";
import { Router, NavigationEnd } from "@angular/router";
import { StoryService } from "./_services/story.service";
import { Story } from "./_models/story";

declare let gtag: Function;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  date = new Date();

  title = "Anouma.net news";
  stories: Story[];
  constructor(public router: Router, private storyservice: StoryService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-144982778-3", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadMostReadStories();
  }
  loadMostReadStories() {
    this.storyservice.loadMostReadStories().subscribe((stories: Story[]) => {
      this.stories = stories;
    });
  }
}
