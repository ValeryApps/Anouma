import { Component, OnInit } from '@angular/core';
import {Story} from "../../../_models/story";
import {Pagination, PaginationResult} from "../../../_models/pagination";
import {StoryService} from "../../../_services/story.service";
import {ActivatedRoute} from "@angular/router";
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css']
})
export class SocietyComponent implements OnInit {

  stories:Story[];
  pagination:Pagination;
  category:string = 'Societé';
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService, private titleTag:TitleTagService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
    this.loadStories();

    this.titleTag.setTitle('Société - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/stories/', "Société", "Société page", null);
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
