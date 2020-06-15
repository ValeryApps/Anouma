import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PaginationResult} from "../_models/pagination";
import {Video} from "../_models/video";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Story} from "../_models/story";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.apiUrl;

  constructor( private http:HttpClient) { }
  createVideo(video:any){
  return this.http.post(`${this.baseUrl}videos`, video);
  }

  getVideo(id:number){
   return this.http.get(`${this.baseUrl}videos/${id}`);
  }


  getVideos(currentPage?, pageSize?, category?):Observable<PaginationResult<Video[]>>{
    const paginationResult : PaginationResult<Video[]> = new PaginationResult<Video[]>();
    let params = new HttpParams();
    if(currentPage != null && pageSize!=null){
      params = params.append('currentPage', currentPage);
      params = params.append('pageSize', pageSize);
    }
    if(category!==undefined){
      params = params.append('category', category);
    }
    return this.http.get<Video[]>(`${this.baseUrl}videos`, {observe:'response', params}).pipe(
      map(response=>{
        paginationResult.result = response.body;
        if(response.headers.get('Pagination')!==null){
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginationResult;
      })
    )
  }
  loadVideos(currentPage?, pageSize?, category?): Observable<Video[]>{
    let videos:Video[];
    let params = new HttpParams();
    if(currentPage != null && pageSize != null){
      params = params.append('currentPage', currentPage);
      params = params.append('pageSize', pageSize);
    }
    if(category != null){
      params = params.append('category',category);
    }
    return this.http.get<Video[]>(`${this.baseUrl}videos`, {observe: 'response', params}).pipe(
      map(response=>{
        videos = response.body;
        return videos;
      })
    )
  }

  updateVideo(id:number, video:Video){
    return this.http.put(`${this.baseUrl}videos/${id}`, video);
  }
deleteVideo(id:number){
  return this.http.post(`${this.baseUrl}videos/delete/${id}`,{} );
}
}
