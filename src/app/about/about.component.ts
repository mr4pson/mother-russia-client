import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AboutSectionService } from '../_services/about-section.service';
import { AboutSection } from '../_models/about-section';
import { AboutPage } from './../_models/about-page';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
import { StripHtmlPipe } from './../_pipes/striphtml.pipe';
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
  innerWidth: number = 0;
  url: string;
  component: AboutPage;
  leftBarVisible: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private aboutSectionService: AboutSectionService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService:Title,
    private imageService: ImageService,
    private stripPipe: StripHtmlPipe
  ) {
    this.innerWidth = window.screen.width;
    this.navigationSubscription = router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  initialiseInvites() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.url ? this.getSection(this.url) : null;
    this.aboutSectionService.getComponent().subscribe(component => {
      this.component = component.data;
    });
    this.getSections();
  }
  getSections(): void {
    this.aboutSectionService.getSections()
      .subscribe(sections => {
        this.sections = sections.data;
        !this.url ? this.router.navigate(["about/"+this.sections[0].url]) : null;
        //this.sections.length > 0 ? this.getSection(this.sections[0].url) : null;
      });
  }
  getSection(url) {
    //$('.loader-wrap').show();
    this.aboutSectionService.getSection(url).subscribe(section => {
      // setTimeout(function() {
      //   var image = document.createElement('img');
      //   image.src = globals.getBgUrl($('.top-image-content')[0]);
      //   image.onload = function () {
      //     $('.loader-wrap').fadeOut();
      //   };
      // }, 100);
      section.data.content = globals.createGifffer(section.data.content);
      this.curSection = section.data;
      this.title = "About us - " + this.stripPipe.transform(this.curSection.name);
      this.titleService.setTitle(this.title);
    });
  }
  onLeftBarClick() {
    this.leftBarVisible = !this.leftBarVisible;
  }
  hideLeftBar() {
    this.leftBarVisible = false;
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
