import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Story} from "../_models/story";
import {Observable, of} from "rxjs";
import {StoryService} from "../_services/story.service";
import {catchError} from "rxjs/operators";
import {AlertifyService} from "../_services/alertify.service";

@Injectable()
export class StoryUpdateResolver implements Resolve<Story>{
  constructor(private storyService:StoryService, private router:Router, private alertify:AlertifyService) {  }
  resolve(route: ActivatedRouteSnapshot): Observable<Story> {
    return  this.storyService.getStoryDetails(route.params['slug']).pipe(
      catchError(err => {
        this.alertify.error('Sorry, the connection is broken');
        this.router.navigate(['/']);
        return of(null)
      })
    )
  }
}
