// import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import { StoryService } from '../_services/story.service';
// import {Story} from "../_models/story";
//
//
// @Component({
//   selector: 'app-marquee',
//   templateUrl: './marquee.component.html',
//   styleUrls: ['./marquee.component.css']
// })
// export class MarqueeComponent implements OnInit {
//   @ViewChild("element") element:ElementRef;
// stories:Story[];
//   constructor(private storyService:StoryService) { }
//
//   ngOnInit(): void {
//   this.storyService.loadStories().subscribe((story:Story[])=>{
//   this.stories = story;
//   this.loadMarquee();
// });
//   }
//   loadMarquee(){
//     let i = 0;
//     var title = this.element.nativeElement
//     setInterval(()=>{
//       i++;
//       if(i == this.stories.length){
//         i =0;
//       }
//     }, 500)
//   }
//
// }
