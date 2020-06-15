import {Component, OnInit} from '@angular/core';
import {Story} from "../_models/story";
import {StoryService} from "../_services/story.service";
import {ActivatedRoute} from "@angular/router";
import {Pagination} from "../_models/pagination";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
stories:Story[];
loaded = false;
pagination:Pagination;
  constructor(private storyService:StoryService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.stories = data['stories'].result;
      this.loaded=true;
    })
  }
 // getStories(){
 //    this.storyService.getStories().subscribe((st:Story[])=>{
 //      this.stories = st;
 //    })
 // }
}
