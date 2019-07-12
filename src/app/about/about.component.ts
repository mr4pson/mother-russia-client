import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AboutSectionService } from '../_services/about-section.service';
import { AboutSection } from '../_models/about-section';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  navigationSubscription;
  sections: AboutSection[];
  curSection: AboutSection;
  title: string;
  constructor(
    private aboutSectionService: AboutSectionService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService:Title
  ) {
    this.navigationSubscription = router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    const url = this.route.snapshot.paramMap.get('url');
    this.getSection(url);
  }
  getSections(): void {
    this.aboutSectionService.getSections()
      .subscribe(sections => {
        this.sections = sections.data;
        this.sections.length > 0 ? this.getSection(this.sections[0].url) : null;
      });
  }
  getSection(url) {
    this.aboutSectionService.getSection(url).subscribe(section => {
      section.data.content = globals.createGifffer(section.data.content);
      this.curSection = section.data;
      this.title = "About us - " + this.curSection.name;
      this.titleService.setTitle(this.title);
    });
  }
  ngOnInit() {
    this.getSections();
    const url = this.route.snapshot.paramMap.get('url');
    url ? this.getSection(url) : null;
    $('.loader-wrap').show();
    setTimeout(function() {
      var image = document.createElement('img');
      image.src = globals.getBgUrl($('.top-image-content')[0]);
      image.onload = function () {
        $('.loader-wrap').fadeOut();
      };
    }, 100);
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
