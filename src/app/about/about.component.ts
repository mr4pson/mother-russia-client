import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AboutSectionService } from '../_services/about-section.service';
import { AboutSection } from '../_models/about-section';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  sections: AboutSection[];
  curSection: AboutSection;
  socialNetsBtnClicked: boolean = false;
  constructor(
    private aboutSectionService: AboutSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.route.snapshot.paramMap.get('url');
        this.getSection(url);
      }
    });
  }
  getSections(): void {
    this.aboutSectionService.getSections()
      .subscribe(sections => {
        this.sections = sections.data;
        this.sections.length > 0 ? this.getSection(this.sections[0].url) : null;
      });
  }
  getSection(url) {
    this.aboutSectionService.getSection(url)
      .subscribe(section => {
        this.curSection = section.data;
      });
  }
  ngOnInit() {
    this.getSections();
    const url = this.route.snapshot.paramMap.get('url');
    url ? this.getSection(url) : null;
  }

}
