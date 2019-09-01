import { Component, OnInit } from '@angular/core';
import { globals } from '../globals';
import { Title, Meta } from "@angular/platform-browser";
import { ArticleService } from '../_services/article.service';
import { SliderService } from './../_services/slider.service';
import { ImageService } from './../_services/image.service';
import { PageService } from './../_services/page.service';
import { Article } from '../_models/article';
import { Slider } from './../_models/slider';
import { Page } from './../_models/page';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseURI = 'http://api.motherrussia.net';
  slideConfig = {
    "dots": true,
    "arrows": false,
    "infinite": true,
    "slidesToShow": 1,
    "autoplay": true,
    "autoplaySpeed": 6000,
    "pauseOnHover": false,
    "speed": 1500,
    "cssEase": 'cubic-bezier(0.950, 0.050, 0.195, 0.935)',
  };
  slickInit(e) {
    //console.log('slick initialized');
  }
  
  breakpoint(e) {
    //console.log('breakpoint');
  }
  
  afterChange(e) {
    //console.log('afterChange');
  }
  
  beforeChange(e) {
    //console.log('beforeChange');
  }
  mostViewedArticles: Article[];
  bottomArticlesLeft: Article[] = [];
  bottomArticlesRight: Article[] = [];
  sliders: Slider[];
  constructor(
    private titleService: Title,
    private articleService: ArticleService,
    private sliderService: SliderService,
    private imageService: ImageService,
    private meta: Meta,
    private pageService: PageService,
  ) {
    this.pageService.getPageData('/homePage').subscribe(pageData => {
      let page: Page = pageData.data;
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  ngOnInit() {
    $('.loader-wrap').show();
    this.articleService.getMostViewedArticles().subscribe(articles => {
      this.mostViewedArticles = articles.data;
    });
    this.articleService.getLastArticleBySection('travel').subscribe(article => {
      article.data ? this.bottomArticlesLeft.push(article.data) : null;
    });
    this.articleService.getLastArticleBySection('culture').subscribe(article => {
      article.data ? this.bottomArticlesLeft.push(article.data) : null;
    });
    this.articleService.getLastArticleBySection('kitchen').subscribe(article => {
      console.log(article);
      article.data ? this.bottomArticlesRight.push(article.data) : null;
    });
    this.sliderService.getSliders().subscribe(sliders => {
      this.sliders = sliders.data;
      console.log(this.sliders);
      let imagesReady = 0;
      setTimeout(() => {
        $('ngx-slick-carousel .slide').each(function() {
            var image = document.createElement('img');
            image.src = globals.getBgUrl($(this)[0]);
            image.onload = function () {
              imagesReady++;
            };
        });
      }, 1000);
      setInterval(() => {
        if (imagesReady >= 4) {
          $('.loader-wrap').fadeOut();
          imagesReady = 0;
        }
      }, 400);
    })
  }

}
