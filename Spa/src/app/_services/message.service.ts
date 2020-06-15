import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Message} from "../_models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  sendMessage(msg:Message){
    return this.http.post(`${this.baseUrl}messages`, msg);
  }
  retrieveMessages(){
    return this.http.get(`${this.baseUrl}messages`);
  }
  retrieveMessage(id:number){
    return this.http.get(`${this.baseUrl}Messages/${id}`);
  }
}
