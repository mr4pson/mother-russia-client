import { Component } from '@angular/core';
import { Meta } from "@angular/platform-browser";
import { Router, NavigationEnd } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showBlockerBar: boolean = false;
  instructionsShown: boolean = false;
  constructor(
    private meta: Meta,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      try {
        if (typeof ga === 'function') {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
            console.log('%%% Google Analytics page view event %%%');
          }
        }
      } catch(e) {
        console.log(e);
      }
    });
    this.meta.addTag({name: 'description', content: ''});
  }
  showInstructions(value) {
    this.instructionsShown = value;
  }
  ngOnInit()
  {
    var testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        this.showBlockerBar = true;
      } else {
        this.showBlockerBar = false;
      }
      testAd.remove();
    }, 100);
  }
}
