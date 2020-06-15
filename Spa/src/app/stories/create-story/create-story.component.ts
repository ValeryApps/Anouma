import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../_services/story.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertifyService} from "../../_services/alertify.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {
  baseUrl = environment.apiUrl;
 story:any = {};
  categories = ['Sports', 'Politique', 'Economie', 'Santé', 'Tech', 'Culture', 'Société', 'Justice', 'Afrique', 'Monde'];
storyForm:FormGroup;
  constructor(private formBuild:FormBuilder, private alertify:AlertifyService,
              private storyService:StoryService, private router:Router) { }

  ngOnInit(): void {
  }

 addStory(){
    this.storyService.CreatStory(this.story).subscribe(()=>{
      this.alertify.success("Successful");
    }, error => {
      this.alertify.error("failed");
    }, ()=>{
      this.router.navigate(['/admin']);
   })
 }
 cancel(){
    this.router.navigate(['/admin'])
 }
}

