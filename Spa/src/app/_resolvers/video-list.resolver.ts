import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Story} from "../_models/story";
import {Observable, of} from "rxjs";
import {StoryService} from "../_services/story.service";
import {catchError} from "rxjs/operators";
import {VideoService} from "../_services/video.service";
import { Video } from '../_models/video';
import {AlertifyService} from "../_services/alertify.service";

@Injectable()
export class VideoListResolver implements Resolve<Video[]>{
  currentPage = 1;
  pageSize = 5;
  constructor(private videoService:VideoService, private router:Router, private alertify:AlertifyService) {  }
  resolve(route: ActivatedRouteSnapshot): Observable<Video[]> {
    return  this.videoService.getVideos(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.alertify.error('Sorry, the connection is broken');
        this.router.navigate(['/']);
        return of(null)
      })
    )
  }
}
