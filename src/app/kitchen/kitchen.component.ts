import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Article } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { globals } from '../globals';
import { ImageService } from './../_services/image.service';
import { Title } from "@angular/platform-browser";
//declare var $: any;

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  articles: Article[];
  navigationSubscription;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService:Title,
    private imageService: ImageService
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
    this.titleService.setTitle("Kitchen");
    this.articleService.getArticlesBySection('kitchen').subscribe(
      articles => {
        this.articles = articles.data
        console.log(this.articles);
        // setTimeout(function() {
        //   var image = document.createElement('img');
        //   image.src = globals.getBgUrl($('.top-image-content')[0]);
        //   image.onload = function () {
        //     $('.loader-wrap').fadeOut();
        //   };
        // }, 100);
      }
    );
  }
  ngOnInit() {
    //$('.loader-wrap').show();
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
