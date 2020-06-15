import { Component, OnInit } from '@angular/core';
import {Story} from "../_models/story";
import {StoryService} from "../_services/story.service";
import {VideoService} from "../_services/video.service";
import {Video} from "../_models/video";
import {PaginationResult} from "../_models/pagination";


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
entertainmentStories:Story[];
techStories:Story[];
sportsStories:Story[];
videos:Video[];


  constructor(private storyService:StoryService, private videoService:VideoService) { }

  ngOnInit(): void {
this.loadEntertainmentStories();
this.loadSportsStories();
this.loadTechStories();
this.loadVideos();

  }
 loadEntertainmentStories(){
    this.storyService.loadStories(null, null, "Culture").subscribe(st=>{
      this.entertainmentStories = st;
    })
    }

  loadSportsStories(){
    this.storyService.loadStories(null, null, "Sports").subscribe(st=>{
      this.sportsStories = st;
    })
  }
  loadTechStories(){
    this.storyService.loadStories(null, null, "Tech").subscribe(st=>{
      this.techStories = st;
    })
  }
loadVideos(){
    this.videoService.loadVideos().subscribe(vid=>{
      this.videos = vid;
    })
}
}
