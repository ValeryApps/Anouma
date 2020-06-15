import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../_services/video.service";
import {AlertifyService} from "../../_services/alertify.service";
import {Video} from "../../_models/video";

@Component({
  selector: 'app-video-update',
  templateUrl: './video-update.component.html',
  styleUrls: ['./video-update.component.css']
})
export class VideoUpdateComponent implements OnInit {
video:Video;
  constructor(private route:ActivatedRoute,
              private videoService:VideoService, private alertify:AlertifyService, private router:Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.video = data['video'];
    })
  }
updateVideo(){
    this.videoService.updateVideo(this.video.id, this.video).subscribe(()=>{
      this.alertify.message("successful");
      this.router.navigate(['/admin'])
    }, error => {
      this.alertify.error(error.error);
    })
}
cancel(){
    this.router.navigate(['/videos'])
}
}
