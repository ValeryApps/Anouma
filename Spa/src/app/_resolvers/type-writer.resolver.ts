import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Story} from "../_models/story";
import {Observable, of} from "rxjs";
import {StoryService} from "../_services/story.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class TypeWriterResolver implements Resolve<Story[]>{
  currentPage = 1;
  pageSize = 6;
  constructor(private storyService:StoryService, private router:Router) {  }
  resolve(route: ActivatedRouteSnapshot): Observable<Story[]> {
    return  this.storyService.loadMarqueeStories().pipe(
      catchError(err => {
        return of(null)
      })
    )
  }
}
