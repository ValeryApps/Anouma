import { Component, OnInit } from '@angular/core';
import {Story} from "../../../_models/story";
import {Pagination, PaginationResult} from "../../../_models/pagination";
import {StoryService} from "../../../_services/story.service";
import {ActivatedRoute} from "@angular/router";
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  stories:Story[];
  pagination:Pagination;
  category:string = 'Sports';
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService, private titleTag:TitleTagService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
    this.loadStories();

    this.titleTag.setTitle('Sports - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/category/', "sports", "sports page", null);
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
