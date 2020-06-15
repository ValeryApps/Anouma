import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {User} from "../_models/user";
import {map} from "rxjs/operators";
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService();
  decodedToken:any;
  baseUrl = environment.apiUrl + "account/";
  currentUser:User;

  constructor(private http:HttpClient, private alertify: AlertifyService, private router:Router) { }

  register(user: User){

   return this.http.post(`${this.baseUrl}register`, user);
  }

  login(user: User){
    return this.http.post(`${this.baseUrl}login`, user)
      .pipe(
        map((response:any)=>{
          const user = response;
          if(user){
            localStorage.setItem("token", user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = JSON.parse(localStorage.getItem('user'));
          }

        })
      )
  }


  loggedIn(){
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token)
  }


  roleMatch(allowedRole):boolean{
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    let isMatch = false;
    if(this.decodedToken){
      const userRole = this.decodedToken.role as Array<string>;
      if(userRole){
      allowedRole.forEach(element=>{
        if(userRole.includes(element)){
          isMatch = true;
          return;
        }
      });
      }
    }
    return isMatch;
  }

}
