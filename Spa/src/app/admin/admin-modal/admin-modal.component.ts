import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import {User} from "../../_models/user";

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {
  @Output() updateSelectedRoles = new EventEmitter();
  user:User;
  roles: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
  }
 updateRole(){
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
 }
}
