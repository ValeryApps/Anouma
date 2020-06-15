import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../_services/admin.service";
import {User} from "../../_models/user";
import {AlertifyService} from "../../_services/alertify.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AdminModalComponent} from "../admin-modal/admin-modal.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  bsModalRef:BsModalRef;
  users:User[];
  constructor(private adminService:AdminService, private alertify:AlertifyService ,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
 loadUsers(){
    this.adminService.loadUsers().subscribe((users:User[])=>{
      this.users = users;
    }, error => {
      this.alertify.error("Could not load users");
    })
 }

  editRoleModal(user:User){
    const initialState = {
     user,
      roles: this.getRolesList(user)
    };
    this.bsModalRef = this.modalService.show(AdminModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values)=> {
      const roleToUpdate = {
        roleName: [...values.filter(x => x.checked === true).map(x => x.name)]
      };
      if (roleToUpdate) {

        this.adminService.updateUserRoles(user, roleToUpdate).subscribe(() => {
          user.roles = [...roleToUpdate.roleName];
        }, error => {
          console.log(error)
        })
      }
    })
  }

  private getRolesList(user){
    const roles = [];
    const userRoles = user.roles;
    const availabeRoles : any[] = [
      {name:"AdminUser", value:"AdminUser"},
      {name:"Moderator", value:"Moderator"},
      {name:"Member", value:"Member"},
    ];
    for (let i = 0; i< availabeRoles.length; i++){
      let isMatch = false;
      for(let j = 0; j < userRoles.length; j++){
        if(availabeRoles[i]?.name === userRoles[j]){
          isMatch = true;
          availabeRoles[i].checked = true;
          roles.push(availabeRoles[i]);
          break;
        }
      }
      if(!isMatch){
        availabeRoles[i].checked = false;
        roles.push(availabeRoles[i]);
      }
    }
    return roles;
  }
}
