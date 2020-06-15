import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Message} from "../_models/message";
import {MessageService} from "../_services/message.service";
import {AlertifyService} from "../_services/alertify.service";

@Injectable()
export class MessageResolver implements Resolve<Message>{
  constructor(private messageService:MessageService, private router:Router, private alertify:AlertifyService) {  }
  resolve(route: ActivatedRouteSnapshot): Observable<Message> {
    return  this.messageService.retrieveMessage(+route.params['id']).pipe(
      catchError(err => {
        this.alertify.error('Sorry, the connection is broken');
        this.router.navigate(['/']);
        return of(null)
      })
    )
  }
}
