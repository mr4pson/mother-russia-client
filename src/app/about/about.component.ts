import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, HostListener , Inject} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AboutSectionService } from '../_services/about-section.service';
import { AboutSection } from '../_models/about-section';
import { AboutPage } from './../_models/about-page';
import { globals } from '../globals';
import { ImageService } from './../_services/image.service';
import { StripHtmlPipe } from './../_pipes/striphtml.pipe';
import { Title, Meta } from "@angular/platform-browser";


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
    this.innerWidth = this.window.innerWidth;
  }
  constructor(@Inject(WINDOW) private window: Window, 
    private aboutSectionService: AboutSectionService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService:Title,
    private imageService: ImageService,
    private meta: Meta
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
      });
  }
  getSection(url) {
    this.aboutSectionService.getSection(url).subscribe(section => {
      section.data.content = globals.clearEditable(section.data.content);
      section.data.content = globals.createGifffer(section.data.content);
      this.curSection = section.data;
      this.title = this.curSection.metaTitle;
      this.titleService.setTitle(this.curSection.metaTitle);
      this.meta.updateTag({name: 'description', content: this.curSection.metaDescription});
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
