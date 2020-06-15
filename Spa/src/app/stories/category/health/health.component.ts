import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/_models/story';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { StoryService } from 'src/app/_services/story.service';
import { ActivatedRoute } from '@angular/router';
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  stories:Story[];
  pagination:Pagination;
  category:string = "Santé";
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService, private titleTag:TitleTagService, private route:ActivatedRoute) { }

    ngOnInit(): void {
      this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
   this.loadStories();

   this.titleTag.setTitle('Santé - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/stories/', "Santé", "Santé page", null);
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
