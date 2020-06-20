import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/_services/story.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationResult, Pagination } from 'src/app/_models/pagination';
import { Story } from 'src/app/_models/story';
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-africa',
  templateUrl: './africa.component.html',
  styleUrls: ['./africa.component.css']
})
export class AfricaComponent implements OnInit {

  stories:Story[];
  pagination:Pagination;
  category:string = "Afrique";
  rotate = false;
  maxSize = 15;
  constructor(private storyService:StoryService, private titleTag:TitleTagService, private route:ActivatedRoute) { }

    ngOnInit(): void {
      window.scrollTo(0,0)
      this.route.data.subscribe(data=>{
      this.pagination = data['stories'].pagination;
    });
   this.loadStories();
   this.titleTag.setTitle('Afrique - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/stories/', "Afrique", "Afrique page", null);
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
