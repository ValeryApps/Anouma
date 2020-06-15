import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/_models/video';
import {ActivatedRoute} from "@angular/router";
import { TitleTagService } from 'src/app/_services/title-tag.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit {
video:Video;
  constructor(private route:ActivatedRoute, private titleTag:TitleTagService ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.video = data['video'];
    });
    this.titleTag.setTitle(this.video.title);
    this.titleTag.setSocialMediaTags(
      'localhost:4200/video', "Video", "Video page", null);
  }

}
