import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Story } from "../_models/story";
import { Observable } from "rxjs";
import { PaginationResult } from "../_models/pagination";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  CreatStory(story: any) {
    return this.http.post(`${this.baseUrl}stories`, story);
  }

  getStories(
    currentPage?,
    pageSize?,
    category?
  ): Observable<PaginationResult<Story[]>> {
    const paginationResult: PaginationResult<Story[]> = new PaginationResult<
      Story[]
    >();
    let params = new HttpParams();
    if (currentPage != null && pageSize != null) {
      params = params.append("currentPage", currentPage);
      params = params.append("pageSize", pageSize);
    }
    if (category != null) {
      params = params.append("category", category);
    }
    return this.http
      .get<Story[]>(`${this.baseUrl}stories`, { observe: "response", params })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get("pagination")
            );
          }
          return paginationResult;
        })
      );
  }

  getStoryDetails(slug: string) {
    return this.http.get(`${this.baseUrl}stories/${slug}`);
  }

  // loadCategory(category:string){
  //  return this.http.get('http://localhost:5000/api/stories?category='+category);
  // }

  updateStory(slug: string, story: any) {
    return this.http.put(`${this.baseUrl}stories/${slug}`, story);
  }

  loadStories(currentPage?, pageSize?, category?): Observable<Story[]> {
    let stories: Story[];
    let params = new HttpParams();
    if (currentPage != null && pageSize != null) {
      params = params.append("currentPage", currentPage);
      params = params.append("pageSize", pageSize);
    }
    if (category != null) {
      params = params.append("category", category);
    }
    return this.http
      .get<Story[]>(`${this.baseUrl}stories`, { observe: "response", params })
      .pipe(
        map((response) => {
          stories = response.body;
          return stories;
        })
      );
  }
  loadMarqueeStories() {
    return this.http.get(`${this.baseUrl}stories`);
  }
  deleteStory(id: number) {
    return this.http.post(`${this.baseUrl}stories/delete/${id}`, {});
  }

  loadMostReadStories() {
    return this.http.get<Story[]>(`${this.baseUrl}stories/mostRead`);
  }
}
