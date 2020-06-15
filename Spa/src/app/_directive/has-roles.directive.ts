import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {JwtHelperService} from "@auth0/angular-jwt";

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {
jwtHelper:JwtHelperService = new JwtHelperService();
@Input() appHasRoles: string[];
isVisible = false;
  constructor(private viewContainerRef:ViewContainerRef,
    private templateRef:TemplateRef<any>, private authService:AuthService) { }

    ngOnInit(): void {
     const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
     if(decodedToken !== null){
       const userRoles = decodedToken.role as Array<string>;
       if(!userRoles){
         this.viewContainerRef.clear();
       }

       if (this.authService.roleMatch(this.appHasRoles)) {
         if(!this.isVisible){
           this.isVisible = true;
           this.viewContainerRef.createEmbeddedView(this.templateRef);
         }
         else{
           this.isVisible = false;
           this.viewContainerRef.clear();
         }
       }
     }
    }
}
