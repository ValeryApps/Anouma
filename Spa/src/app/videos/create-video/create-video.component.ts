import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../../_services/video.service";
import {Router} from "@angular/router";
import {AlertifyService} from "../../_services/alertify.service";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {
  videoFrom:FormGroup;
  video:any = {};
  constructor(private videoService:VideoService, private alertify:AlertifyService,
              private formBuilder:FormBuilder, private router :Router) { }

  ngOnInit(): void {
    this.CreatValidation();
  }
CreatValidation(){
    this.videoFrom = this.formBuilder.group({
      title:['', Validators.required],
      intro:['', Validators.required],
      videoUrl:['', Validators.required],
      category:['', Validators.required],
      author:['', Validators.required],
      datePosted:['', Validators.required]
      })
}
 createVideo(){
    if(this.videoFrom.valid){
      this.video = Object.assign(this.videoFrom.value);
      return this.videoService.createVideo(this.video).subscribe(()=>{
        this.alertify.success("successful");
      }, error => {
        this.alertify.error(error)
      }, ()=>{
        this.router.navigate(['/videos']);
      })
    }
   }
   cancel(){
    this.router.navigateByUrl('/admin')
   }
}
