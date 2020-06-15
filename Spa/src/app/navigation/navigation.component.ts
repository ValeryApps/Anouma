import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { Story } from "../_models/story";
import { StoryService } from "../_services/story.service";
import { AlertifyService } from "../_services/alertify.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { User } from "../_models/user";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  user: User = new User();
  modelRef: BsModalRef;
  buttonOf = false;
  public clicked = false;
  _el: any;
  loginMode = false;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private story: StoryService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}
  stories: Story[];
  ngOnInit(): void {
    this.loadStories();
  }

  loadStories() {
    this.story.loadMarqueeStories().subscribe((stories: Story[]) => {
      this.stories = stories;
    });
  }
  logout() {
    this.alertify.confirm("You are about to logout", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.authService.currentUser = null;
      this.authService.decodedToken = null;
      this.router.navigate(["/"]).then();
    });
  }
  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  login() {
    this.authService.login(this.user).subscribe(
      () => {
        this.alertify.success("login successfully");
        this.loginMode = false;
        this.buttonOf = true;
        this.router.navigate(["/"]);
      },
      (error) => {
        this.alertify.error("Sorry, failed logging in ");
        setTimeout(() => {
          this.loginMode = false;
        }, 60000);
      }
    );
  }

  activateLoginForm() {
    this.loginMode = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template);
  }
  closeModal() {
    this.modalService.hide(1);
  }
  register() {
    this.authService.register(this.user).subscribe(
      () => {
        this.alertify.success("Registration successful");
        this.closeModal();
      },
      (error) => {
        this.alertify.error("Registration failed");
      }
    );
  }
}
