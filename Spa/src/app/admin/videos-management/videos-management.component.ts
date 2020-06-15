import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../_services/admin.service";
import {AlertifyService} from "../../_services/alertify.service";
import {Video} from "../../_models/video";
import { VideoService } from 'src/app/_services/video.service';

@Component({
  selector: 'app-videos-management',
  templateUrl: './videos-management.component.html',
  styleUrls: ['./videos-management.component.css']
})
export class VideosManagementComponent implements OnInit {
videos:Video[];
  constructor( private adminService:AdminService, private alertify:AlertifyService, private videoService:VideoService) { }

  ngOnInit(): void {
    this.loadVideos();
  }
loadVideos(){
    this.adminService.loadVideos().subscribe((videos:Video[])=>{
      this.videos = videos;
    }, error => {
      this.alertify.error("Could no load videos");
    })
}
deleteVideo(id:number){
  this.alertify.confirm('Are you sure you want to delete this video ?', ()=>{
    this.videoService.deleteVideo(id).subscribe(()=>{
      this.videos.splice(this.videos.findIndex(x=>x.id==id), 1);
      this.alertify.success("video successfully deleted");
    }, error => {
      this.alertify.error("failed");
    });
  });
}
}
