import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Story} from "../_models/story";
import {Observable, of} from "rxjs";
import {StoryService} from "../_services/story.service";
import {catchError} from "rxjs/operators";
import {Video} from "../_models/video";
import {VideoService} from "../_services/video.service";
import {AlertifyService} from "../_services/alertify.service";

@Injectable()
export class VideoDetailResolver implements Resolve<Video>{
  constructor(private videoService:VideoService, private router:Router, private alertify:AlertifyService) {  }
  resolve(route: ActivatedRouteSnapshot): Observable<Video> {
    return  this.videoService.getVideo(route.params['id']).pipe(
      catchError(err => {
        this.alertify.error('Sorry, the connection is broken');
        this.router.navigate(['/']);
        return of(null)
      })
    )
  }
}
