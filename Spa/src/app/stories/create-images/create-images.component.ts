import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Image} from "../../_models/Image";
import {StoryService} from "../../_services/story.service";
import { FileUploader } from 'ng2-file-upload';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-images',
  templateUrl: './create-images.component.html',
  styleUrls: ['./create-images.component.css']
})
export class CreateImagesComponent implements OnInit {

  @Input() photos: Image[];
  baseUrl = environment.apiUrl;

image:Image;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(private storyService: StoryService, private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({

      url: `${this.baseUrl}images/stories/${+this.route.snapshot.params['id']}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
     this.router.navigate(["/stories"])
    }
  }
}
