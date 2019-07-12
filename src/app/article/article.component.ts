import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticleService } from '../_services/article.service';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { ImageService } from './../_services/image.service';
import { Title } from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  section: string;
  innerWidth: number = 0;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService:Title,
    private imageService: ImageService
  ) {
    this.innerWidth = window.screen.width;
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  ngOnInit() {
    $('.loader-wrap').show();
    let url = this.route.snapshot.paramMap.get('url');
    this.section = this.route.snapshot.paramMap.get('section');
    this.articleService.getArticle(url).subscribe(
      article => {
        article.data.content = globals.createGifffer(article.data.content);
        this.article = article.data;
        this.title = this.section[0].toUpperCase() + this.section.slice(1) + " - " + this.article.title;
        this.titleService.setTitle(this.title);
        setTimeout(function() {
          var image = document.createElement('img');
          image.src = globals.getBgUrl($('.top-image-content')[0]);
          image.onload = function () {
            $('.loader-wrap').fadeOut();
          };
        }, 100);
      }
    );
  }

}
