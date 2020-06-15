import { Component, OnInit } from '@angular/core';
import {Story} from "../../_models/story";
import {AdminService} from "../../_services/admin.service";
import {AlertifyService} from "../../_services/alertify.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AdminModalComponent} from "../admin-modal/admin-modal.component";
import {StoryService} from "../../_services/story.service";

@Component({
  selector: 'app-stories-management',
  templateUrl: './stories-management.component.html',
  styleUrls: ['./stories-management.component.css']
})
export class StoriesManagementComponent implements OnInit {
bsModalRef:BsModalRef;
  stories:Story[];
  constructor( private adminService:AdminService, private storyService:StoryService,
               private alertify:AlertifyService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadStories();
  }
  loadStories(){
    this.adminService.loadStories().subscribe((stories:Story[])=>{
      this.stories = stories;
    }, error => {
      this.alertify.error("Could not load stories");
    })
  }
  editStoryModal(){
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(AdminModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';

  }

  deleteStory(id:number){
    this.alertify.confirm('Are you sure you want to delete this story ?', ()=>{
      this.storyService.deleteStory(id).subscribe(()=>{
        this.stories.splice(this.stories.findIndex(x=>x.id==id), 1);
        this.alertify.success("Story successfully deleted");
      }, error => {
        this.alertify.error(error);
      });
    });
  }
}
