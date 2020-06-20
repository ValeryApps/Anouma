import { Component, OnInit } from "@angular/core";
import { StoryService } from "../../_services/story.service";
import { ActivatedRoute } from "@angular/router";
import { Story } from "../../_models/story";
import { Pagination, PaginationResult } from "../../_models/pagination";
import { AlertifyService } from "../../_services/alertify.service";
import { TitleTagService } from "src/app/_services/title-tag.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: "app-stories-list",
  templateUrl: "./stories-list.component.html",
  styleUrls: ["./stories-list.component.css"],
})
export class StoriesListComponent implements OnInit {
  stories: Story[];
  mostReadStories: Story[];
  storiesWithImage: Story[];
  pagination: Pagination;
  rotate = false;
  maxSize = 5;
  totalPages: number;
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private alertify: AlertifyService,
    private titleTag: TitleTagService,
    private ngxloader:NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.ngxloader.start();
    this.route.data.subscribe((data) => {
      this.stories = data["stories"].result;
      this.pagination = data["stories"].pagination;
      this.storiesWithImage = this.stories.filter(
        (x) =>
          x.imageUrl !== null &&
          x.category !== "Afrique" &&
          x.category !== "Monde"
      );
    });
    
    this.totalPages = Math.ceil(
      this.pagination.totalItems / this.pagination.pageSize
    );
    this.titleTag.setTitle("Home - Anouma News");
    this.titleTag.setSocialMediaTags(
      "localhost:4200/stories/",
      "Home",
      "home page",
      null
    );

    this.loadMostReadStories();
    this.ngxloader.stop()
  }

  onPageChanged($event) {
    this.pagination.currentPage = $event.page;
    this.ngxloader.start();
    this.loadStories();
    this.ngxloader.stop();
  }

  loadStories() {
    this.storyService
      .getStories(this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((st: PaginationResult<Story[]>) => {
        this.stories = st.result;
        this.pagination = st.pagination;
      });
  }
  deleteStory(id: number) {
    this.alertify.confirm(
      "Are you sure you want to delete this story?",
      (e) => {
        this.storyService.deleteStory(id).subscribe(
          () => {
            this.stories.splice(
              this.stories.findIndex((x) => x.id == id),
              1
            );
            this.alertify.success("Story successfully deleted");
          },
          (error) => {
            this.alertify.error(error);
          }
        );
      }
    );
  }
  loadMostReadStories() {
    this.storyService.loadMostReadStories().subscribe((st: Story[]) => {
      this.mostReadStories = st;
    });
  }
}
