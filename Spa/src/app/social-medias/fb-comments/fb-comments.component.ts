import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'fb-comments',
  template: `<div class="fb-comments" [attr.data-href]="url" data-width="" data-numposts="5"></div>`
})
export class FbCommentsComponent implements AfterViewInit {
  @Input() url = location.href;
  constructor() {

    if (!window['fbAsyncInit']) {
      window['fbAsyncInit'] = function () {
          window['FB'].init({
              appId: '1080042435705296',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v6.0'
          });
      };
  }

    const url = 'https://connect.facebook.net/fr_FR/sdk.js';
    if (!document.querySelector(`script[src='${url}']`)) {
        let script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }
   }
  ngAfterViewInit(): void {
    window['FB'] && window['FB'].XFBML.parse();
  }

 

}
