import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FileUploadModule } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  BsDropdownModule,
  PaginationModule,
  TabsModule,
  ModalModule,
  TooltipModule,
} from "ngx-bootstrap";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TimeagoModule } from "ngx-timeago";
import { JwtModule } from "@auth0/angular-jwt";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { CreateStoryComponent } from "./stories/create-story/create-story.component";
import { StoryService } from "./_services/story.service";
import { StoriesListComponent } from "./stories/stories-list/stories-list.component";
import { CreateImagesComponent } from "./stories/create-images/create-images.component";
import { StoryDetailsComponent } from "./stories/story-details/story-details.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { VideoListComponent } from "./videos/video-list/video-list.component";
import { CreateVideoComponent } from "./videos/create-video/create-video.component";
import { StoryCardComponent } from "./stories/story-card/story-card.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { StoryDetailsResolver } from "./_resolvers/story-details.resolver";
import { StoryListResolver } from "./_resolvers/story-list.resolver";
import { EconomyComponent } from "./stories/category/economy/economy.component";
import { SportsComponent } from "./stories/category/sports/sports.component";
import { PoliticsComponent } from "./stories/category/politics/politics.component";
import { SocietyComponent } from "./stories/category/society/society.component";
import { EntertainmentComponent } from "./stories/category/entertainment/entertainment.component";
import { VideoListResolver } from "./_resolvers/video-list.resolver";
import { SafePipe } from "./pipe";
import { WatchVideoComponent } from "./videos/watch-video/watch-video.component";
import { VideoDetailResolver } from "./_resolvers/video-detail.resolver";
import { ScriptComponent } from "./script/script.component";
import { StoryUpdateComponent } from "./stories/story-update/story-update.component";
import { StoryUpdateResolver } from "./_resolvers/story-update.resolver";
import { VideoUpdateComponent } from "./videos/video-update/video-update.component";
import { VideoUpdateResolver } from "./_resolvers/video-update.resolver";
import { TechComponent } from "./stories/category/tech/tech.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { AccountComponent } from "./account/account.component";
import { AuthService } from "./_services/auth.service";
import { HasRolesDirective } from "./_directive/has-roles.directive";
import { StoriesManagementComponent } from "./admin/stories-management/stories-management.component";
import { VideosManagementComponent } from "./admin/videos-management/videos-management.component";
import { AdminModalComponent } from "./admin/admin-modal/admin-modal.component";
import { HealthComponent } from "./stories/category/health/health.component";
import { WorldComponent } from "./stories/category/world/world.component";
import { AfricaComponent } from "./stories/category/africa/africa.component";
// import { MarqueeComponent } from './marquee/marquee.component';
import { UserManagementComponent } from "./admin/user-management/user-management.component";
import { FbLikeComponent } from "./social-medias/fb-like/fb-like.component";
import { FbCommentsComponent } from "./social-medias/fb-comments/fb-comments.component";
import { GoogleAnalyticsService } from "./_services/google-analytic.service";
import { MessageListResolver } from "./_resolvers/message-list.resolver";
import { MessageResolver } from "./_resolvers/message.resolver";
import { MessageService } from "./_services/message.service";
import { MessagesManagementComponent } from "./admin/messages-management/messages-management.component";
import { MessageComponent } from "./admin/message/message.component";
import { VidThumbnailComponent } from "./videos/vid-thumbnail/vid-thumbnail.component";
import { StoryCard2Component } from "./stories/story-card2/story-card2.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateStoryComponent,
    StoriesListComponent,
    CreateImagesComponent,
    StoryDetailsComponent,
    NavigationComponent,
    VideoListComponent,
    CreateVideoComponent,
    StoryCardComponent,
    SideBarComponent,
    EconomyComponent,
    SportsComponent,
    PoliticsComponent,
    SocietyComponent,
    EntertainmentComponent,
    SafePipe,
    WatchVideoComponent,
    ScriptComponent,
    StoryUpdateComponent,
    VideoUpdateComponent,
    TechComponent,
    ContactUsComponent,
    AboutUsComponent,
    AdminPanelComponent,
    AccountComponent,
    HasRolesDirective,
    StoriesManagementComponent,
    VideosManagementComponent,
    AdminModalComponent,
    AfricaComponent,
    HealthComponent,
    WorldComponent,
    //MarqueeComponent,
    UserManagementComponent,
    FbLikeComponent,
    FbCommentsComponent,
    MessagesManagementComponent,
    MessageComponent,
    VidThumbnailComponent,
    StoryCard2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/account"],
      },
    }),
    AngularEditorModule,
    NgxUiLoaderModule
  ],
  entryComponents: [AdminModalComponent],

  providers: [
    StoryService,
    StoryDetailsResolver,
    StoryListResolver,
    VideoListResolver,
    VideoDetailResolver,
    StoryUpdateResolver,
    VideoUpdateResolver,
    AuthService,
    GoogleAnalyticsService,
    MessageListResolver,
    MessageResolver,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
