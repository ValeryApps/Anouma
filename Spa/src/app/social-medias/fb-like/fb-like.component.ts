import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'fb-like',
    template: `<div class="fb-like" [attr.data-href]="url" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true" data-size="large"></div>`
})

export class FbLikeComponent implements AfterViewInit {
    @Input() url = location.href;

    constructor() {
        // initialise facebook sdk after it loads if required
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

        // load facebook sdk if required
        const url = 'https://connect.facebook.net/fr_FR/sdk.js';
        if (!document.querySelector(`script[src='${url}']`)) {
            let script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }

    ngAfterViewInit(): void {
        // render facebook button
        window['FB'] && window['FB'].XFBML.parse();
    }
}