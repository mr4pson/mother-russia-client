import { Component, OnInit } from '@angular/core';
import { PageService } from './../_services/page.service';
import { Title, Meta } from "@angular/platform-browser";
import { Page } from './../_models/page';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  constructor(
    private titleService:Title,
    private pageService: PageService,
    private meta: Meta
  ) {
    this.pageService.getPageData('/learnPage').subscribe(pageData => {
      let page: Page = pageData.data;
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
  }

  ngOnInit() {
  }

}
