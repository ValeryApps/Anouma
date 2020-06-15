import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {StoriesListComponent} from "./stories/stories-list/stories-list.component";
import {StoryDetailsComponent} from "./stories/story-details/story-details.component";
import {CreateStoryComponent} from "./stories/create-story/create-story.component";
import {CreateVideoComponent} from "./videos/create-video/create-video.component";
import {VideoListComponent} from "./videos/video-list/video-list.component";
import {CreateImagesComponent} from "./stories/create-images/create-images.component";
import {StoryDetailsResolver} from "./_resolvers/story-details.resolver";
import {StoryListResolver} from "./_resolvers/story-list.resolver";
import {EconomyComponent} from "./stories/category/economy/economy.component";
import {PoliticsComponent} from "./stories/category/politics/politics.component";
import {EntertainmentComponent} from "./stories/category/entertainment/entertainment.component";
import {SportsComponent} from "./stories/category/sports/sports.component";
import {SocietyComponent} from "./stories/category/society/society.component";
import {VideoListResolver} from "./_resolvers/video-list.resolver";
import {WatchVideoComponent} from "./videos/watch-video/watch-video.component";
import {VideoDetailResolver} from "./_resolvers/video-detail.resolver";
import {StoryUpdateComponent} from "./stories/story-update/story-update.component";
import {StoryUpdateResolver} from "./_resolvers/story-update.resolver";
import {VideoUpdateComponent} from "./videos/video-update/video-update.component";
import {VideoUpdateResolver} from "./_resolvers/video-update.resolver";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {AccountComponent} from "./account/account.component";
import {AdminPanelComponent} from "./admin/admin-panel/admin-panel.component";
import {AuthGuard} from "./_guards/auth.guard";
import { HealthComponent } from './stories/category/health/health.component';
import { AfricaComponent } from './stories/category/africa/africa.component';
import { WorldComponent } from './stories/category/world/world.component';
import {MessageResolver} from "./_resolvers/message.resolver";
import { MessageComponent } from './admin/message/message.component';
import { VidThumbnailComponent } from './videos/vid-thumbnail/vid-thumbnail.component';


const routes: Routes = [
  {path:'', component:HomeComponent, resolve:{stories:StoryListResolver}},
  {path:'', runGuardsAndResolvers:"always", canActivate:[AuthGuard], children:[
      {path:'create-story', component:CreateStoryComponent},
      {path:'update-story/:slug', component:StoryUpdateComponent, resolve:{story:StoryUpdateResolver}},
      {path:'create-video', component:CreateVideoComponent},
      {path:'update-video/:id', component:VideoUpdateComponent, resolve:{video:VideoUpdateResolver}},
      {path:'create-image/:id', component:CreateImagesComponent},
      {path:'video-thumbnail/:id', component:VidThumbnailComponent},
      {path:'admin', component:AdminPanelComponent, data:{roles:["AdminUser", "Moderator"]}}
    ]},
  {path:'stories', component:StoriesListComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/economy', component:EconomyComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/politics', component:PoliticsComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/entertainment', component:EntertainmentComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/sports', component:SportsComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/world', component:WorldComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/africa', component:AfricaComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/health', component:HealthComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/category/society', component:SocietyComponent, resolve:{stories:StoryListResolver}},
  {path:'stories/:slug', component:StoryDetailsComponent, resolve:{story: StoryDetailsResolver }},
  {path:'messages/:id', component:MessageComponent, resolve:{msg: MessageResolver }},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'account', component:AccountComponent},
  {path:'videos', component:VideoListComponent, resolve:{videos:VideoListResolver}},
  {path:'videos/:id', component:WatchVideoComponent, resolve:{video:VideoDetailResolver}},
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
