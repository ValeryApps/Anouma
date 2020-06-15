import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Video} from "../../_models/video";
import {Pagination, PaginationResult} from "../../_models/pagination";
import {VideoService} from "../../_services/video.service";
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
videos:Video[];
pagination:Pagination;
  constructor(private route:ActivatedRoute, private titleTag:TitleTagService, private videoService:VideoService) {

}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.videos = data['videos'].result;
      this.pagination = data['videos'].pagination;
    });

    this.titleTag.setTitle('Videos - Anouma News');
    this.titleTag.setSocialMediaTags(
      'localhost:4200/videos/', "Video", "Video page", null);
  }

onPageChanged($event:any){
    this.pagination.currentPage = $event.page();
    this.loadVideos();
}
  loadVideos(){
    this.videoService.getVideos(this.pagination.currentPage, this.pagination.pageSize)
      .subscribe((vid:PaginationResult<Video[]>)=>{
        this.videos = vid.result;
        this.pagination = vid.pagination;
      })
  }
}
