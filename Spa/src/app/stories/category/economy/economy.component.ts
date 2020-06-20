import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../../_services/story.service";
import {Story} from "../../../_models/story";
import {Pagination, PaginationResult} from "../../../_models/pagination";
import {ActivatedRoute} from "@angular/router";
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-economy',
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.css']
})
export class EconomyComponent implements OnInit {
stories:Story[];
pagination:Pagination;
category:string = "Economie";
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService, private titleTag:TitleTagService, private route:ActivatedRoute) { }

    ngOnInit(): void {
      window.scrollTo(0,0)
      this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
   this.loadStories();
   this.titleTag.setTitle('Economie - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/stories/', "Home", "home page", null);
  }
  loadStories(){
    this.storyService.getStories(this.pagination?.currentPage, this.pagination?.pageSize, this.category)
      .subscribe((data:PaginationResult<Story[]>)=>{
        this.pagination = data.pagination;
        this.stories = data.result;
      })
  }
  onPageChanged($event){
    this.pagination.currentPage = $event.page;
    this.loadStories();
  }
}
