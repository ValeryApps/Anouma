import { Component, OnInit } from "@angular/core";
import { Story } from "../../_models/story";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TitleTagService } from "src/app/_services/title-tag.service";
import { StoryService } from "../../_services/story.service";

@Component({
  selector: "app-story-details",
  templateUrl: "./story-details.component.html",
  styleUrls: ["./story-details.component.css"],
})
export class StoryDetailsComponent implements OnInit {
  story: Story;
  url = "http://ivoire.anouma.net/stories";
  mySubscription: any;
  constructor(
    private route: ActivatedRoute,
    private titleTag: TitleTagService,
    private router: Router,
    private storyService: StoryService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.story = data["story"];
    });
    this.titleTag.setTitle(this.story.title);
    this.titleTag.setSocialMediaTags(
      "http://anouma.net/stories/" + this.story.slug,
      this.story.title,
      this.story.title,
      this.story.imageUrl
    );
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  // getStory(){
  //     this.storyService.getStoryDetails(this.route.snapshot.params['slug']).subscribe((st:Story)=>{
  //      this.story = st;
  //     })
  //}
}
