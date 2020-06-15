import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/_services/story.service';
import { Story } from 'src/app/_models/story';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  stories:Story[];
  pagination:Pagination;
  category:string = "International";
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService,private titleTag:TitleTagService, private route:ActivatedRoute) { }

    ngOnInit(): void {
      this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
   this.loadStories();


   this.titleTag.setTitle('International - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/category/', "International", "International news on anouma", null);
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
