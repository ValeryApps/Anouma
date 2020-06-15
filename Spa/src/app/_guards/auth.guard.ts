import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router, private alertify:AlertifyService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   const roles = next.firstChild.data['roles'] as Array<string>;
   if(roles){
     const match = this.authService.roleMatch(roles);
     if(match)
       return true;
     else {
       this.router.navigate(['/']);
       this.alertify.error("Access denied!!!")
     }
    }
   if(this.authService.loggedIn()){
     return true
   }

  }

}
