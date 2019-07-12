import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showBlockerBar: boolean = false;
  instructionsShown: boolean = false;
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
