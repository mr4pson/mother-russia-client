import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Article } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { ImageService } from './../_services/image.service';
import { PageService } from './../_services/page.service';
import { Title, Meta } from "@angular/platform-browser";
import { Page } from './../_models/page';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {
  articles: Article[];
  navigationSubscription;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService:Title,
    private imageService: ImageService,
    private pageService: PageService,
    private meta: Meta
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  initialiseInvites() {
    forkJoin(
      this.articleService.getArticlesBySection('culture'),
      this.pageService.getPageData('/culturePage')
    ).subscribe(res => {
      this.articles = res[0].data;
      let page: Page = res[1].data;
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
