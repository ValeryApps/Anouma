import { Component, OnInit } from '@angular/core';
import {Story} from "../../_models/story";
import {AdminService} from "../../_services/admin.service";
import {AlertifyService} from "../../_services/alertify.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
stories:Story[];
  constructor( private adminService:AdminService, private alertify:AlertifyService) { }

  ngOnInit(): void {
  }

}
