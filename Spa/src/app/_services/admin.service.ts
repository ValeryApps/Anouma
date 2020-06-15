import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.apiUrl;
  constructor( private http:HttpClient) { }

  loadStories(){
   return this.http.get(`${this.baseUrl}admin/allStories`);
  }
  loadVideos(){
    return this.http.get(`${this.baseUrl}admin/allVideos`);
  }
  loadUsers(){
    return this.http.get(`${this.baseUrl}admin/users`);
  }
  updateUserRoles(user:User, role:{}){
   return  this.http.post(`${this.baseUrl}admin/EditRoles/${user.userName}`, role);
  }

}
