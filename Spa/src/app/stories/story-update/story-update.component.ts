import { Component, OnInit } from '@angular/core';
import {Story} from "../../_models/story";
import {StoryService} from "../../_services/story.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertifyService} from "../../_services/alertify.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-story-update',
  templateUrl: './story-update.component.html',
  styleUrls: ['./story-update.component.css']
})
export class StoryUpdateComponent implements OnInit {
story:Story;
storyForm:FormGroup;
  constructor(private storyService:StoryService, private route:ActivatedRoute,
              private formBuild:FormBuilder, private alertify:AlertifyService, private router:Router) { }

  categories = ['Sports', 'Politique', 'Sécurité', 'Religion', 'Education',
    'Economie', 'Santé', 'Tech', 'Medias', 'Culture', 'Société', 'Justice', 'Afrique', 'International'];

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.story = data['story'];
    })

  }

  updateStory(){
      this.storyService.updateStory(this.story.slug, this.story).subscribe(()=>{
        this.alertify.success("Successful!")
      }, error=>{
        this.alertify.error(error.error);
      }, ()=>{
        this.router.navigate(['/stories'])
      });
    }

  cancel(){
    this.router.navigate(['/'])
  }
}
